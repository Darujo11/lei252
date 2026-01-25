import { Home, BookOpen, Calculator, FileText, BarChart3, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar({ activeSection, setActiveSection, capitulos }) {
  const [expandedCap, setExpandedCap] = useState(null)

  const scrollToSection = (sectionId) => {
    // Primeiro vai para a página inicial se não estiver nela
    if (activeSection !== 'inicio') {
      setActiveSection('inicio')
      // Espera a página carregar antes de rolar
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px] hidden lg:block">
      <nav className="p-4">
        {/* Lei Completa */}
        <div className="mb-4">
          <button 
            onClick={() => setActiveSection('inicio')}
            className={`sidebar-item w-full text-left px-4 py-3 rounded-lg font-semibold flex items-center gap-3 ${activeSection === 'inicio' ? 'active bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <Home size={18} />
            Lei Completa
          </button>
        </div>
        
        {/* Ferramentas */}
        <div className="mb-4">
          <h3 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Ferramentas</h3>
          <button 
            onClick={() => setActiveSection('glossario')}
            className={`sidebar-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${activeSection === 'glossario' ? 'active bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen size={16} />
            Glossário
          </button>
          <button 
            onClick={() => setActiveSection('calculadora')}
            className={`sidebar-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${activeSection === 'calculadora' ? 'active bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Calculator size={16} />
            Calculadora
          </button>
          <button
            onClick={() => setActiveSection('leis')}
            className={`sidebar-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${activeSection === 'leis' ? 'active bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileText size={16} />
            PDFs das Leis
          </button>
          <button
            onClick={() => setActiveSection('admin')}
            className={`sidebar-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 ${activeSection === 'admin' ? 'active bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BarChart3 size={16} />
            Painel Admin
          </button>
        </div>

        {/* Navegação por Capítulos */}
        <div>
          <h3 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Navegação Rápida</h3>
          {capitulos.map(cap => (
            <div key={cap.id} className="mb-1">
              <button 
                onClick={() => {
                  scrollToSection(cap.id)
                  setExpandedCap(expandedCap === cap.id ? null : cap.id)
                }}
                className="sidebar-item w-full text-left px-4 py-2 text-sm font-medium flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <span className="w-6 h-6 rounded bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {cap.numero}
                </span>
                <span className="flex-1 text-xs truncate">
                  {cap.titulo}
                </span>
                {expandedCap === cap.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              
              {/* Seções do Capítulo */}
              {expandedCap === cap.id && (
                <div className="ml-4 mt-1 space-y-0.5 animate-fade-in">
                  {cap.secoes.map(sec => (
                    <button 
                      key={sec.id} 
                      onClick={() => scrollToSection(sec.id)}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:text-brand-600 hover:bg-gray-50 rounded truncate block"
                    >
                      {sec.titulo}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  )
}
