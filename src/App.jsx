import { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'
import PaginaInicial from './pages/PaginaInicial'
import PaginaGlossario from './pages/PaginaGlossario'
import PaginaCalculadora from './pages/PaginaCalculadora'
import PaginaLeis from './pages/PaginaLeis'
import PaginaAdminProtegida from './pages/PaginaAdminProtegida'
import { capitulos } from './data/capitulos'
import { trackPageView } from './services/analytics'

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // Analytics: Rastreia mudanças de página
  useEffect(() => {
    const nomesPaginas = {
      'inicio': 'Lei Completa',
      'glossario': 'Glossário',
      'calculadora': 'Calculadora',
      'leis': 'PDFs das Leis',
      'admin': 'Painel Admin'
    }

    const nomePagina = nomesPaginas[activeSection] || activeSection
    trackPageView(nomePagina, activeSection)

    // Rastreia duração ao sair da página
    const startTime = Date.now()
    return () => {
      const duracao = Math.floor((Date.now() - startTime) / 1000)
      // Você pode adicionar trackPageDuration aqui se quiser
      console.log(`⏱️ Tempo na página ${nomePagina}: ${duracao}s`)
    }
  }, [activeSection])

  const renderContent = () => {
    switch(activeSection) {
      case 'glossario':
        return <PaginaGlossario />
      case 'calculadora':
        return <PaginaCalculadora />
      case 'leis':
        return <PaginaLeis />
      case 'admin':
        return <PaginaAdminProtegida />
      default:
        return <PaginaInicial setActiveSection={setActiveSection} searchTerm={searchTerm} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        showSearch={showSearch} 
        setShowSearch={setShowSearch} 
      />
      
      <div className="flex">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          capitulos={capitulos} 
        />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl">
          {/* Mobile Navigation */}
          <div className="lg:hidden mb-4">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:outline-none bg-white font-medium"
            >
              <option value="inicio">📜 Lei Completa</option>
              <option value="glossario">📖 Glossário</option>
              <option value="calculadora">🧮 Calculadora</option>
              <option value="leis">📁 PDFs das Leis</option>
              <option value="admin">📊 Painel Admin</option>
            </select>
          </div>

          {renderContent()}
        </main>
      </div>

      <Footer />
      <ChatBot />
    </div>
  )
}

export default App
