import { useState, useEffect } from 'react'
import {
  BarChart3,
  MessageSquare,
  Users,
  Eye,
  TrendingUp,
  Clock,
  Calendar,
  Search,
  Download,
  RefreshCw
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  getAnalyticsSummary,
  getChatbotConversations,
  getVisitasPorDia,
  isSupabaseEnabled
} from '../services/analytics'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function PaginaAdmin() {
  const [loading, setLoading] = useState(true)
  const [resumo, setResumo] = useState(null)
  const [conversas, setConversas] = useState([])
  const [visitasPorDia, setVisitasPorDia] = useState([])
  const [filtroConversas, setFiltroConversas] = useState('')
  const [diasFiltro, setDiasFiltro] = useState(30)

  const carregarDados = async () => {
    setLoading(true)
    try {
      const [resumoData, conversasData, visitasData] = await Promise.all([
        getAnalyticsSummary(diasFiltro),
        getChatbotConversations(100),
        getVisitasPorDia(diasFiltro)
      ])

      setResumo(resumoData)
      setConversas(conversasData)
      setVisitasPorDia(visitasData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isSupabaseEnabled()) {
      alert('⚠️ Supabase não configurado! Configure as variáveis de ambiente.')
      return
    }
    carregarDados()
  }, [diasFiltro])

  if (!isSupabaseEnabled()) {
    return (
      <div className="animate-fade-in">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">⚠️ Supabase Não Configurado</h2>
          <p className="text-red-700 mb-4">
            Para usar o painel administrativo, você precisa configurar o Supabase.
          </p>
          <div className="bg-white rounded-lg p-4 text-left">
            <h3 className="font-semibold mb-2">Passos para configurar:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside text-gray-700">
              <li>Acesse <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">supabase.com</a> e crie um projeto</li>
              <li>Execute o script <code className="bg-gray-100 px-2 py-1 rounded">supabase-setup.sql</code> no SQL Editor</li>
              <li>Configure as variáveis no arquivo <code className="bg-gray-100 px-2 py-1 rounded">.env</code></li>
              <li>Reinicie o servidor de desenvolvimento</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="animate-fade-in flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="animate-spin text-brand-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    )
  }

  const conversasFiltradas = conversas.filter(c =>
    c.pergunta.toLowerCase().includes(filtroConversas.toLowerCase()) ||
    c.resposta.toLowerCase().includes(filtroConversas.toLowerCase())
  )

  const COLORS = ['#3378fc', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-brand-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">📊 Painel Administrativo</h1>
            <p className="text-blue-100">Analytics do Portal LC 252/2016</p>
          </div>
          <div className="flex gap-2">
            <select
              value={diasFiltro}
              onChange={(e) => setDiasFiltro(Number(e.target.value))}
              className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value={7}>Últimos 7 dias</option>
              <option value={30}>Últimos 30 dias</option>
              <option value={90}>Últimos 90 dias</option>
            </select>
            <button
              onClick={carregarDados}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total de Visitas</h3>
            <Eye className="text-blue-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{resumo?.totalVisitas || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Acessos à página</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Sessões Únicas</h3>
            <Users className="text-purple-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{resumo?.sessoesUnicas || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Visitantes únicos</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Perguntas ao ChatBot</h3>
            <MessageSquare className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{resumo?.totalPerguntas || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Conversas com IA</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Taxa de Engajamento</h3>
            <TrendingUp className="text-orange-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {resumo?.sessoesUnicas > 0
              ? Math.round((resumo.totalPerguntas / resumo.sessoesUnicas) * 100)
              : 0}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Perguntas por visitante</p>
        </div>
      </div>

      {/* Gráfico de Visitas por Dia */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="text-brand-600" />
          Visitas por Dia
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={visitasPorDia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visitas"
              stroke="#3378fc"
              strokeWidth={2}
              name="Visitas"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Páginas Mais Visitadas */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Páginas Mais Visitadas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resumo?.paginasPopulares || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pagina" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3378fc" name="Visitas" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Conversas do ChatBot */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare className="text-brand-600" />
            Conversas do ChatBot
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={filtroConversas}
              onChange={(e) => setFiltroConversas(e.target.value)}
              placeholder="Buscar conversas..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-brand-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {conversasFiltradas.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare size={48} className="mx-auto mb-2 opacity-50" />
              <p>Nenhuma conversa encontrada</p>
            </div>
          ) : (
            conversasFiltradas.map((conversa) => (
              <div
                key={conversa.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} />
                    {format(new Date(conversa.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </div>
                  {conversa.tokens_usados && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {conversa.tokens_usados} tokens
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-600 uppercase">Pergunta</span>
                    </div>
                    <p className="text-sm bg-blue-50 p-3 rounded-lg text-gray-800">
                      {conversa.pergunta}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-600 uppercase">Resposta</span>
                    </div>
                    <div className="text-sm bg-gray-50 p-3 rounded-lg text-gray-700 whitespace-pre-wrap">
                      {conversa.resposta}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Botão de Exportação */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            const dataStr = JSON.stringify({
              resumo,
              conversas,
              visitasPorDia,
              exportadoEm: new Date().toISOString()
            }, null, 2)
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
            const link = document.createElement('a')
            link.setAttribute('href', dataUri)
            link.setAttribute('download', `analytics-${new Date().toISOString().split('T')[0]}.json`)
            link.click()
          }}
          className="px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Download size={20} />
          Exportar Dados
        </button>
      </div>
    </div>
  )
}
