import { supabase, isSupabaseEnabled as checkSupabase } from '../lib/supabase'

// Re-exporta para uso em outros arquivos
export const isSupabaseEnabled = checkSupabase

// Gera um ID de sessão único para o usuário
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('portal_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem('portal_session_id', sessionId)
  }
  return sessionId
}

// Registra uma visita a uma página
export const trackPageView = async (pagina, secao = null) => {
  if (!checkSupabase()) {
    console.log('📊 Analytics desabilitado (Supabase não configurado)')
    return
  }

  try {
    const sessionId = getSessionId()

    // Coleta informações do navegador
    const dados = {
      session_id: sessionId,
      pagina,
      secao,
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      referrer: document.referrer || null,
    }

    // Registra a visita
    const { error } = await supabase
      .from('analytics_visitas')
      .insert([dados])

    if (error) {
      console.error('Erro ao registrar visita:', error)
      return
    }

    // Atualiza ou cria a sessão agregada
    await atualizarSessao(sessionId)

    console.log('✅ Visita registrada:', pagina)
  } catch (error) {
    console.error('Erro no analytics:', error)
  }
}

// Atualiza informações da sessão
const atualizarSessao = async (sessionId) => {
  try {
    // Verifica se a sessão já existe
    const { data: sessaoExistente } = await supabase
      .from('analytics_sessoes')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (sessaoExistente) {
      // Atualiza sessão existente
      await supabase
        .from('analytics_sessoes')
        .update({
          ultima_visita: new Date().toISOString(),
          total_paginas_vistas: sessaoExistente.total_paginas_vistas + 1,
        })
        .eq('session_id', sessionId)
    } else {
      // Cria nova sessão
      await supabase
        .from('analytics_sessoes')
        .insert([{
          session_id: sessionId,
          total_paginas_vistas: 1,
        }])
    }
  } catch (error) {
    console.error('Erro ao atualizar sessão:', error)
  }
}

// Registra uma conversa do chatbot
export const trackChatbotConversation = async (pergunta, resposta, metadata = {}) => {
  if (!checkSupabase()) {
    console.log('📊 Analytics desabilitado (Supabase não configurado)')
    return
  }

  try {
    const sessionId = getSessionId()

    const dados = {
      session_id: sessionId,
      pergunta,
      resposta,
      modelo: metadata.modelo || 'gpt-4o-mini',
      tokens_usados: metadata.tokens || null,
      tempo_resposta_ms: metadata.tempoResposta || null,
    }

    const { error } = await supabase
      .from('chatbot_conversas')
      .insert([dados])

    if (error) {
      console.error('Erro ao registrar conversa:', error)
      return
    }

    // Atualiza contador de perguntas na sessão
    const { data: sessao } = await supabase
      .from('analytics_sessoes')
      .select('total_perguntas_chatbot')
      .eq('session_id', sessionId)
      .single()

    if (sessao) {
      await supabase
        .from('analytics_sessoes')
        .update({
          total_perguntas_chatbot: (sessao.total_perguntas_chatbot || 0) + 1,
        })
        .eq('session_id', sessionId)
    }

    console.log('✅ Conversa registrada no banco')
  } catch (error) {
    console.error('Erro ao registrar conversa:', error)
  }
}

// Registra tempo de permanência em uma página (chamar ao sair da página)
export const trackPageDuration = async (paginaId, duracaoSegundos) => {
  if (!checkSupabase()) return

  try {
    const sessionId = getSessionId()

    // Busca a última visita desta sessão para esta página
    const { data: visita } = await supabase
      .from('analytics_visitas')
      .select('id')
      .eq('session_id', sessionId)
      .eq('pagina', paginaId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (visita) {
      await supabase
        .from('analytics_visitas')
        .update({ duracao_segundos: duracaoSegundos })
        .eq('id', visita.id)
    }
  } catch (error) {
    console.error('Erro ao atualizar duração:', error)
  }
}

// Obtém estatísticas gerais (para o painel admin)
export const getAnalyticsSummary = async (diasAtras = 30) => {
  if (!checkSupabase()) return null

  try {
    const dataInicio = new Date()
    dataInicio.setDate(dataInicio.getDate() - diasAtras)

    // Total de visitas
    const { count: totalVisitas } = await supabase
      .from('analytics_visitas')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', dataInicio.toISOString())

    // Sessões únicas
    const { data: sessoes } = await supabase
      .from('analytics_sessoes')
      .select('session_id')
      .gte('primeira_visita', dataInicio.toISOString())

    // Total de perguntas ao chatbot
    const { count: totalPerguntas } = await supabase
      .from('chatbot_conversas')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', dataInicio.toISOString())

    // Páginas mais visitadas
    const { data: paginasPopulares } = await supabase
      .from('analytics_visitas')
      .select('pagina')
      .gte('created_at', dataInicio.toISOString())

    // Agrupa páginas
    const contagemPaginas = {}
    paginasPopulares?.forEach(p => {
      contagemPaginas[p.pagina] = (contagemPaginas[p.pagina] || 0) + 1
    })

    return {
      totalVisitas,
      sessoesUnicas: sessoes?.length || 0,
      totalPerguntas,
      paginasPopulares: Object.entries(contagemPaginas)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([pagina, total]) => ({ pagina, total })),
    }
  } catch (error) {
    console.error('Erro ao obter resumo:', error)
    return null
  }
}

// Obtém conversas do chatbot (para o painel admin)
export const getChatbotConversations = async (limite = 50) => {
  if (!checkSupabase()) return []

  try {
    const { data, error } = await supabase
      .from('chatbot_conversas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limite)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Erro ao obter conversas:', error)
    return []
  }
}

// Obtém visitas por dia (para gráficos)
export const getVisitasPorDia = async (diasAtras = 30) => {
  if (!checkSupabase()) return []

  try {
    const dataInicio = new Date()
    dataInicio.setDate(dataInicio.getDate() - diasAtras)

    const { data, error } = await supabase
      .from('analytics_visitas')
      .select('created_at')
      .gte('created_at', dataInicio.toISOString())
      .order('created_at', { ascending: true })

    if (error) throw error

    // Agrupa por dia
    const visitasPorDia = {}
    data?.forEach(v => {
      const dia = new Date(v.created_at).toLocaleDateString('pt-BR')
      visitasPorDia[dia] = (visitasPorDia[dia] || 0) + 1
    })

    return Object.entries(visitasPorDia).map(([data, visitas]) => ({
      data,
      visitas,
    }))
  } catch (error) {
    console.error('Erro ao obter visitas por dia:', error)
    return []
  }
}
