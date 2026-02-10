import { useState, useEffect, useRef } from 'react'
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
  RefreshCw,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  History,
  FileJson,
  Edit3,
  ChevronDown,
  ChevronUp,
  Save
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
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import {
  getAnalyticsSummary,
  getChatbotConversations,
  getVisitasPorDia,
  isSupabaseEnabled,
  saveLeiVersion,
  getLatestLeiVersion,
  getLeiVersionHistory
} from '../services/analytics'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { capitulos as capitulosOriginais } from '../data/capitulos'
import {
  exportLeiAsJSON,
  exportLeiAsTXT,
  parseLeiJSON,
  diffLeiVersions,
  downloadFile
} from '../utils/documentUtils'
import ArtigoCardEditavel from '../components/ArtigoCardEditavel'

function SortableArtigoWrapper({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
    position: 'relative'
  }

  return (
    <div ref={setNodeRef} style={style} className="flex gap-2">
      <div {...attributes} {...listeners} className="mt-6 cursor-grab text-gray-400 hover:text-gray-600 flex-shrink-0" title="Arrastar para reordenar">
        <GripVertical size={20} />
      </div>
      <div className="flex-grow min-w-0">
        {children}
      </div>
    </div>
  )
}

export default function PaginaAdmin() {
  const [loading, setLoading] = useState(true)
  const [resumo, setResumo] = useState(null)
  const [conversas, setConversas] = useState([])
  const [visitasPorDia, setVisitasPorDia] = useState([])
  const [filtroConversas, setFiltroConversas] = useState('')
  const [diasFiltro, setDiasFiltro] = useState(30)

  // Estados para gerenciamento da lei
  const [leiAtual, setLeiAtual] = useState(capitulosOriginais)
  const [uploadStatus, setUploadStatus] = useState(null) // null | 'parsing' | 'preview' | 'saving' | 'success' | 'error'
  const [uploadError, setUploadError] = useState(null)
  const [alteracoesDetectadas, setAlteracoesDetectadas] = useState([])
  const [leiModificada, setLeiModificada] = useState(null)
  const [historicoVersoes, setHistoricoVersoes] = useState([])
  const [mostrarHistorico, setMostrarHistorico] = useState(false)
  const fileInputRef = useRef(null)

  // Estados para o editor inline
  const [abaAtiva, setAbaAtiva] = useState('analytics') // 'analytics' | 'editor'
  const [capitulosAbertosEditor, setCapitulosAbertosEditor] = useState({})
  const [secoesAbertasEditor, setSecoesAbertasEditor] = useState({})
  const [alteracoesPendentes, setAlteracoesPendentes] = useState([])
  const [salvandoAlteracoes, setSalvandoAlteracoes] = useState(false)

  // Sensors para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })

  )

  const carregarDados = async () => {
    setLoading(true)
    try {
      const [resumoData, conversasData, visitasData, historico] = await Promise.all([
        getAnalyticsSummary(diasFiltro),
        getChatbotConversations(100),
        getVisitasPorDia(diasFiltro),
        getLeiVersionHistory()
      ])

      setResumo(resumoData)
      setConversas(conversasData)
      setVisitasPorDia(visitasData)
      setHistoricoVersoes(historico)

      // Carregar última versão da lei se existir
      const ultimaVersao = await getLatestLeiVersion()
      if (ultimaVersao?.content) {
        setLeiAtual(ultimaVersao.content)
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  // Funções de Download
  const handleDownloadJSON = () => {
    const jsonContent = exportLeiAsJSON(leiAtual)
    const filename = `lc252-consolidada-${new Date().toISOString().split('T')[0]}.json`
    downloadFile(jsonContent, filename, 'application/json')
  }

  const handleDownloadTXT = () => {
    const txtContent = exportLeiAsTXT(leiAtual)
    const filename = `lc252-consolidada-${new Date().toISOString().split('T')[0]}.txt`
    downloadFile(txtContent, filename, 'text/plain')
  }

  // Funções de Upload
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadStatus('parsing')
    setUploadError(null)
    setAlteracoesDetectadas([])
    setLeiModificada(null)

    try {
      const content = await file.text()
      const result = parseLeiJSON(content)

      if (!result.success) {
        setUploadStatus('error')
        setUploadError(result.error)
        return
      }

      // Detectar alterações
      const changes = diffLeiVersions(leiAtual, result.data)
      setAlteracoesDetectadas(changes)
      setLeiModificada(result.data)
      setUploadStatus('preview')
    } catch (error) {
      setUploadStatus('error')
      setUploadError(`Erro ao ler arquivo: ${error.message}`)
    }

    // Limpar input para permitir re-upload do mesmo arquivo
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAplicarAlteracoes = async () => {
    if (!leiModificada) return

    setUploadStatus('saving')

    const result = await saveLeiVersion(leiModificada, alteracoesDetectadas)

    if (result.success) {
      setLeiAtual(leiModificada)
      setUploadStatus('success')
      setHistoricoVersoes(prev => [{
        version_number: result.versionNumber,
        created_at: new Date().toISOString(),
        created_by: 'admin'
      }, ...prev])

      // Limpar após 3 segundos
      setTimeout(() => {
        setUploadStatus(null)
        setAlteracoesDetectadas([])
        setLeiModificada(null)
      }, 3000)
    } else {
      setUploadStatus('error')
      setUploadError(result.error)
    }
  }

  const handleCancelarUpload = () => {
    setUploadStatus(null)
    setUploadError(null)
    setAlteracoesDetectadas([])
    setLeiModificada(null)
  }

  // Funções do Editor Inline
  const toggleCapituloEditor = (capId) => {
    setCapitulosAbertosEditor(prev => ({ ...prev, [capId]: !prev[capId] }))
  }

  const toggleSecaoEditor = (secId) => {
    setSecoesAbertasEditor(prev => ({ ...prev, [secId]: !prev[secId] }))
  }

  const handleSalvarArtigo = async (capituloId, secaoId, artigoNumero, artigoAtualizado) => {
    // Atualizar lei local
    const novaLei = leiAtual.map(cap => {
      if (cap.id !== capituloId) return cap

      return {
        ...cap,
        secoes: cap.secoes.map(sec => {
          if (sec.id !== secaoId) return sec

          return {
            ...sec,
            artigos: sec.artigos.map(art => {
              if (String(art.numero) !== String(artigoNumero)) return art
              return artigoAtualizado
            })
          }
        })
      }
    })

    setLeiAtual(novaLei)

    // Registrar alteração
    setAlteracoesPendentes(prev => [...prev, {
      tipo: 'alterado',
      capitulo: capituloId,
      secao: secaoId,
      artigo: artigoNumero,
      campo: 'texto',
      valorNovo: artigoAtualizado.texto
    }])
  }

  // Handler de Drag and Drop
  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    // IDs: sec-{id}-art-{numero}
    const activeParts = active.id.toString().split('-art-')
    const overParts = over.id.toString().split('-art-')

    const secIdActive = activeParts[0].replace('sec-', '')
    const activeArtNum = activeParts[1]

    const secIdOver = overParts[0].replace('sec-', '')
    const overArtNum = overParts[1]

    // Só permite reordenar na mesma seção
    if (secIdActive !== secIdOver) return

    setLeiAtual(leiOLD => {
      return leiOLD.map(cap => {
        // Tenta achar a seção dentro deste capítulo
        const secaoIndex = cap.secoes.findIndex(s => String(s.id) === String(secIdActive))
        if (secaoIndex === -1) return cap

        const novaSecoes = [...cap.secoes]
        const secao = novaSecoes[secaoIndex]

        const oldIndex = secao.artigos.findIndex(a => String(a.numero) === String(activeArtNum))
        const newIndex = secao.artigos.findIndex(a => String(a.numero) === String(overArtNum))

        if (oldIndex !== -1 && newIndex !== -1) {
          novaSecoes[secaoIndex] = {
            ...secao,
            artigos: arrayMove(secao.artigos, oldIndex, newIndex)
          }
        }

        return { ...cap, secoes: novaSecoes }
      })
    })

    // Registrar alteração genérica
    setAlteracoesPendentes(prev => {
      // Evitar duplicatas de reordenação excessivas poderia ser bom, mas vamos simplificar
      return [...prev, {
        tipo: 'reordenado',
        capitulo: 'drag-drop',
        secao: secIdActive,
        artigo: 'varios',
        campo: 'ordem',
        valorNovo: 'drag-dropped'
      }]
    })
  }

  // Função para mover artigo
  const handleMoverArtigo = (capituloId, secaoId, index, direcao) => {
    // direcao: -1 (cima), 1 (baixo)
    const novaLei = leiAtual.map(cap => {
      if (cap.id !== capituloId) return cap

      return {
        ...cap,
        secoes: cap.secoes.map(sec => {
          if (sec.id !== secaoId) return sec
          const novosArtigos = [...sec.artigos]
          const novoIndex = index + direcao

          if (novoIndex < 0 || novoIndex >= novosArtigos.length) return sec

          // Swap
          const temp = novosArtigos[index]
          novosArtigos[index] = novosArtigos[novoIndex]
          novosArtigos[novoIndex] = temp

          return { ...sec, artigos: novosArtigos }
        })
      }
    })

    setLeiAtual(novaLei)

    // Registrar alteração genérica para garantir salvamento
    setAlteracoesPendentes(prev => [...prev, {
      tipo: 'reordenado',
      capitulo: capituloId,
      secao: secaoId,
      artigo: 'ordem',
      campo: 'ordem',
      valorNovo: 'alterada'
    }])
  }

  // Função para deletar artigo
  const handleDeletarArtigo = (capituloId, secaoId, artigoNumero) => {
    const novaLei = leiAtual.map(cap => {
      if (cap.id !== capituloId) return cap

      return {
        ...cap,
        secoes: cap.secoes.map(sec => {
          if (sec.id !== secaoId) return sec

          return {
            ...sec,
            artigos: sec.artigos.filter(art => String(art.numero) !== String(artigoNumero))
          }
        })
      }
    })

    setLeiAtual(novaLei)

    // Registrar alteração
    setAlteracoesPendentes(prev => [...prev, {
      tipo: 'deletado',
      capitulo: capituloId,
      secao: secaoId,
      artigo: artigoNumero,
      campo: 'artigo',
      valorNovo: null
    }])
  }

  const handleSalvarTodasAlteracoes = async () => {
    if (alteracoesPendentes.length === 0) {
      alert('Nenhuma alteração pendente para salvar.')
      return
    }

    setSalvandoAlteracoes(true)

    const result = await saveLeiVersion(leiAtual, alteracoesPendentes)

    if (result.success) {
      setAlteracoesPendentes([])
      setHistoricoVersoes(prev => [{
        version_number: result.versionNumber,
        created_at: new Date().toISOString(),
        created_by: 'admin'
      }, ...prev])
      alert(`✅ ${alteracoesPendentes.length} alteração(ões) salva(s) com sucesso! Versão ${result.versionNumber}`)
    } else {
      alert(`❌ Erro ao salvar: ${result.error}`)
    }

    setSalvandoAlteracoes(false)
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
            <p className="text-blue-100">Gerenciamento do Portal LC 252/2016</p>
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

        {/* Abas */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setAbaAtiva('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${abaAtiva === 'analytics'
              ? 'bg-white text-brand-700'
              : 'bg-white/20 text-white hover:bg-white/30'
              }`}
          >
            <BarChart3 size={18} />
            Analytics
          </button>
          <button
            onClick={() => setAbaAtiva('editor')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${abaAtiva === 'editor'
              ? 'bg-white text-brand-700'
              : 'bg-white/20 text-white hover:bg-white/30'
              }`}
          >
            <Edit3 size={18} />
            Editor da Lei
            {alteracoesPendentes.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {alteracoesPendentes.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo baseado na aba ativa */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {abaAtiva === 'analytics' && (
          <>
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

            {/* ============================================ */}
            {/* SEÇÃO DE GERENCIAMENTO DA LEI */}
            {/* ============================================ */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="text-brand-600" />
                Gerenciamento da Lei Consolidada
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coluna 1: Download */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Download size={18} />
                    Baixar Lei
                  </h3>
                  <p className="text-sm text-gray-500">
                    Baixe a lei consolidada para edição. Use o arquivo JSON para fazer alterações e enviar de volta.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownloadJSON}
                      className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2"
                    >
                      <FileJson size={18} />
                      Baixar JSON
                    </button>
                    <button
                      onClick={handleDownloadTXT}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <FileText size={18} />
                      Baixar TXT
                    </button>
                  </div>
                </div>

                {/* Coluna 2: Upload */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Upload size={18} />
                    Enviar Alterações
                  </h3>
                  <p className="text-sm text-gray-500">
                    Edite o arquivo JSON e envie de volta para aplicar as alterações na lei.
                  </p>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="lei-upload"
                    />
                    <label
                      htmlFor="lei-upload"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 cursor-pointer inline-flex"
                    >
                      <Upload size={18} />
                      Selecionar Arquivo JSON
                    </label>
                  </div>
                </div>
              </div>

              {/* Status do Upload */}
              {uploadStatus === 'parsing' && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
                  <RefreshCw className="animate-spin text-blue-600" size={20} />
                  <span className="text-blue-700">Processando arquivo...</span>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <XCircle className="text-red-600" size={20} />
                    <span className="text-red-700 font-medium">Erro no upload</span>
                  </div>
                  <p className="text-red-600 text-sm mt-2">{uploadError}</p>
                  <button
                    onClick={handleCancelarUpload}
                    className="mt-3 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Fechar
                  </button>
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-green-700 font-medium">Alterações aplicadas com sucesso!</span>
                </div>
              )}

              {uploadStatus === 'preview' && alteracoesDetectadas.length >= 0 && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="text-yellow-600" size={20} />
                      <span className="text-yellow-800 font-medium">
                        {alteracoesDetectadas.length === 0
                          ? 'Nenhuma alteração detectada'
                          : `${alteracoesDetectadas.length} alteração(ões) detectada(s)`}
                      </span>
                    </div>
                  </div>

                  {alteracoesDetectadas.length > 0 && (
                    <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
                      {alteracoesDetectadas.map((change, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-yellow-200 text-sm">
                          <div className="font-medium text-gray-800">
                            Art. {change.artigo} - {change.campo}
                          </div>
                          <div className="text-gray-500 text-xs mt-1">
                            {change.capitulo} &gt; {change.secao}
                          </div>
                          {change.valorAnterior && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-red-600">Anterior:</span>
                              <p className="text-xs text-red-700 bg-red-50 p-2 rounded mt-1 line-clamp-2">
                                {change.valorAnterior}
                              </p>
                            </div>
                          )}
                          <div className="mt-2">
                            <span className="text-xs font-medium text-green-600">Novo:</span>
                            <p className="text-xs text-green-700 bg-green-50 p-2 rounded mt-1 line-clamp-2">
                              {change.valorNovo}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {alteracoesDetectadas.length > 0 && (
                      <button
                        onClick={handleAplicarAlteracoes}
                        disabled={uploadStatus === 'saving'}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {uploadStatus === 'saving' ? (
                          <>
                            <RefreshCw className="animate-spin" size={16} />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} />
                            Aplicar Alterações
                          </>
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleCancelarUpload}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Histórico de Versões */}
              {historicoVersoes.length > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setMostrarHistorico(!mostrarHistorico)}
                    className="flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors"
                  >
                    <History size={18} />
                    <span className="font-medium">Histórico de Versões ({historicoVersoes.length})</span>
                  </button>

                  {mostrarHistorico && (
                    <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                      {historicoVersoes.map((versao) => (
                        <div key={versao.id || versao.version_number} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                          <div>
                            <span className="font-medium">Versão {versao.version_number}</span>
                            <span className="text-gray-500 ml-2">
                              por {versao.created_by}
                            </span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            {format(new Date(versao.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botão de Exportação Analytics */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const dataStr = JSON.stringify({
                    resumo,
                    conversas,
                    visitasPorDia,
                    exportadoEm: new Date().toISOString()
                  }, null, 2)
                  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
                  const link = document.createElement('a')
                  link.setAttribute('href', dataUri)
                  link.setAttribute('download', `analytics-${new Date().toISOString().split('T')[0]}.json`)
                  link.click()
                }}
                className="px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Download size={20} />
                Exportar Analytics
              </button>
            </div>
          </>
        )}
        {/* ABA: EDITOR DA LEI */}
        {abaAtiva === 'editor' && (
          <div className="space-y-6">
            {/* Barra de ações do editor */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Edit3 className="text-brand-600" size={20} />
                  <span className="font-medium text-gray-700">Editor da Lei Consolidada</span>
                </div>
                {
                  alteracoesPendentes.length > 0 && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                      {alteracoesPendentes.length} alteração(ões) pendente(s)
                    </span>
                  )
                }
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadJSON}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Baixar JSON
                </button>
                {alteracoesPendentes.length > 0 && (
                  <button
                    onClick={handleSalvarTodasAlteracoes}
                    disabled={salvandoAlteracoes}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {salvandoAlteracoes ? (
                      <>
                        <RefreshCw className="animate-spin" size={16} />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Salvar Tudo no Supabase
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Lista de capítulos para edição */}
            {
              leiAtual.map(capitulo => (
                <div key={capitulo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header do Capítulo */}
                  <button
                    onClick={() => toggleCapituloEditor(capitulo.id)}
                    className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white p-4 flex items-center justify-between hover:from-brand-700 hover:to-brand-800 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg">
                        {capitulo.numero}
                      </span>
                      <div className="text-left">
                        <h2 className="font-bold text-lg">CAPÍTULO {capitulo.numero}</h2>
                        <p className="text-blue-100 text-sm">{capitulo.titulo}</p>
                      </div>
                    </div>
                    {capitulosAbertosEditor[capitulo.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>

                  {/* Conteúdo do Capítulo */}
                  {capitulosAbertosEditor[capitulo.id] && (
                    <div className="p-4 space-y-4">
                      {capitulo.secoes.map(secao => (
                        <div key={secao.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          {/* Header da Seção */}
                          <button
                            onClick={() => toggleSecaoEditor(secao.id)}
                            className="w-full flex items-center justify-between gap-2 p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
                              <h3 className="text-base font-bold text-gray-800">
                                {secao.titulo}
                              </h3>
                              <span className="text-xs text-gray-500">
                                ({secao.artigos?.length || 0} artigos)
                              </span>
                            </div>
                            {secoesAbertasEditor[secao.id] === false ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
                          </button>

                          {/* Artigos da Seção */}
                          {secoesAbertasEditor[secao.id] !== false && (
                            <div className="p-4 space-y-4 bg-gray-50/50">
                              <SortableContext
                                items={secao.artigos.map(a => `sec-${secao.id}-art-${a.numero}`)}
                                strategy={verticalListSortingStrategy}
                              >
                                {secao.artigos?.map((artigo, index) => (
                                  <SortableArtigoWrapper key={artigo.numero} id={`sec-${secao.id}-art-${artigo.numero}`}>
                                    <ArtigoCardEditavel
                                      index={index}
                                      artigo={artigo}
                                      capituloId={capitulo.id}
                                      secaoId={secao.id}
                                      onSave={handleSalvarArtigo}
                                      onDelete={handleDeletarArtigo}
                                      onMove={handleMoverArtigo}
                                    />
                                  </SortableArtigoWrapper>
                                ))}
                              </SortableContext>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        )}
      </DndContext>
    </div>
  )
}
