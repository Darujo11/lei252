import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { BookOpen, Calculator, FileText, ChevronDown, ChevronUp, RefreshCw, Download } from 'lucide-react'
import { leisOrdemCronologica } from '../data/leis'
import { capitulos as capitulosEstaticos } from '../data/capitulos'
import ArtigoCard from '../components/ArtigoCard'
import LeiPDF from '../components/LeiPDF'
import { getLatestLeiVersion, isSupabaseEnabled } from '../services/analytics'

export default function PaginaInicial({ setActiveSection, searchTerm }) {
  const [capitulos, setCapitulos] = useState(capitulosEstaticos)
  const [carregando, setCarregando] = useState(true)
  const [versaoAtual, setVersaoAtual] = useState(null)
  const [capitulosAbertos, setCapitulosAbertos] = useState(
    capitulosEstaticos.reduce((acc, cap) => ({ ...acc, [cap.id]: true }), {})
  )
  const [secoesAbertas, setSecoesAbertas] = useState({})

  const contentRef = useRef(null)

  // Buscar lei do Supabase ao carregar
  useEffect(() => {
    const carregarLei = async () => {
      if (!isSupabaseEnabled()) {
        setCarregando(false)
        return
      }

      try {
        const versao = await getLatestLeiVersion()
        if (versao && versao.content) {
          setCapitulos(versao.content)
          setVersaoAtual(versao.version_number)
          console.log(`✅ Lei carregada do Supabase (Versão ${versao.version_number})`)
        } else {
          console.log('📖 Usando lei estática (nenhuma versão no Supabase)')
        }
      } catch (error) {
        console.error('Erro ao carregar lei do Supabase:', error)
      } finally {
        setCarregando(false)
      }
    }

    carregarLei()
  }, [])

  const toggleCapitulo = (capId) => {
    setCapitulosAbertos(prev => ({ ...prev, [capId]: !prev[capId] }))
  }

  const toggleSecao = (secId) => {
    setSecoesAbertas(prev => ({ ...prev, [secId]: !prev[secId] }))
  }

  const handleDownloadPDF = () => {
    // Apenas invocar a impressão nativa do navegador
    // O CSS @media print cuidará de ocultar o resto e mostrar apenas o #conteudo-lei-print
    window.print()
  }

  return (
    <div className="animate-fade-in relative">
      {/* Container Principal da Aplicação - ocultar quando gerando PDF para evitar conflitos visuais se necessário,
          mas html2pdf deve pegar apenas o elemento alvo. 
          O importante é o overlay estar por cima. */}

      {/* Hero Compacto */}
      <div className="gradient-hero rounded-2xl p-6 md:p-8 text-white mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Lei Complementar 252/2016</h1>
            <p className="text-blue-100 text-sm md:text-base">
              Plano de Cargos, Carreiras e Vencimentos - Câmara Municipal de Macaé
            </p>
            <p className="text-blue-200 text-xs mt-2 flex items-center gap-2">
              📌 Texto consolidado com alterações até LC 355/2025
              {carregando && (
                <span className="flex items-center gap-1">
                  <RefreshCw size={12} className="animate-spin" />
                  Carregando...
                </span>
              )}
              {versaoAtual && (
                <span className="bg-green-500/30 px-2 py-0.5 rounded text-green-100">
                  v{versaoAtual}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownloadPDF}
              className="bg-brand-500 hover:bg-brand-400 text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Download size={14} /> Imprimir / Salvar PDF
            </button>
            <button onClick={() => setActiveSection('glossario')} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
              <BookOpen size={14} /> Glossário
            </button>
            <button onClick={() => setActiveSection('calculadora')} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
              <Calculator size={14} /> Calculadora
            </button>
            <button onClick={() => setActiveSection('leis')} className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
              <FileText size={14} /> Arquivos
            </button>
          </div>
        </div>
      </div>

      {/* Componente para Impressão/PDF via Portal (Fora da árvore principal para evitar CSS display:none do pai) */}
      {createPortal(
        <div id="conteudo-lei-print" className="hidden print:block">
          <LeiPDF capitulos={capitulos} />
        </div>,
        document.body
      )}

      {/* Legenda dos Badges */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">📜 Leis que compõem o texto consolidado:</h3>
        <div className="flex flex-wrap gap-2">
          {leisOrdemCronologica.map((lei, i) => (
            <a
              key={i}
              href={lei.arquivo}
              target="_blank"
              rel="noopener noreferrer"
              className={`lei-badge ${lei.cor}`}
              title={lei.desc}
            >
              {lei.nome}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
          <span className="artigo-badge">Original</span>
          <span className="artigo-badge alterado">✏️ Alterado</span>
          <span className="artigo-badge acrescido">➕ Acrescido</span>
          <span className="artigo-badge revogado">❌ Revogado</span>
        </div>
      </div>

      {/* Preâmbulo */}
      <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100">
        <p className="text-gray-600 italic text-center leading-relaxed">
          "Dispõe sobre a estruturação do Plano de Cargos, Carreiras e Vencimentos dos Servidores da Câmara Municipal de Macaé e dá outras providências."
        </p>
        <p className="text-gray-500 text-sm text-center mt-3">
          O Presidente da Câmara Municipal de Macaé, Estado do Rio de Janeiro, faz saber que a Câmara Municipal aprovou e ele, em seu nome, promulga a seguinte Lei Complementar:
        </p>
      </div>

      {/* Conteúdo Completo da Lei */}
      {capitulos.map(capitulo => (
        <div key={capitulo.id} id={capitulo.id} className="mb-6">
          {/* Header do Capítulo */}
          <button
            onClick={() => toggleCapitulo(capitulo.id)}
            className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl p-4 mb-4 shadow-lg flex items-center justify-between hover:from-brand-700 hover:to-brand-800 transition-all"
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
            {capitulosAbertos[capitulo.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>

          {/* Conteúdo do Capítulo */}
          {capitulosAbertos[capitulo.id] && (
            <div className="animate-fade-in">
              {capitulo.secoes.map(secao => (
                <div key={secao.id} id={secao.id} className="mb-6 scroll-mt-24">
                  {/* Header da Seção */}
                  <button
                    onClick={() => toggleSecao(secao.id)}
                    className="w-full flex items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-brand-200 hover:border-brand-400 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-brand-700 transition-colors">
                        {secao.titulo}
                      </h3>
                    </div>
                    {secoesAbertas[secao.id] === false ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
                  </button>

                  {/* Artigos da Seção */}
                  {secoesAbertas[secao.id] !== false && (
                    <div className="animate-fade-in">
                      {secao.artigos.map(artigo => (
                        <ArtigoCard key={artigo.numero} artigo={artigo} searchTerm={searchTerm} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Rodapé da Lei */}
      <div className="bg-gray-100 rounded-xl p-6 text-center">
        <p className="text-gray-600 font-medium">Macaé, 30 de março de 2016.</p>
        <p className="text-gray-500 text-sm mt-2">EDUARDO CARDOSO GONÇALVES DA SILVA</p>
        <p className="text-gray-400 text-xs">PRESIDENTE</p>
        <p className="text-gray-500 text-sm mt-1">WELBERTH PORTO DE REZENDE</p>
        <p className="text-gray-400 text-xs">1º SECRETÁRIO</p>
      </div>
    </div>
  )
}
