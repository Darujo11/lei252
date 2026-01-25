import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import PaginaInicial from './pages/PaginaInicial'
import PaginaGlossario from './pages/PaginaGlossario'
import PaginaCalculadora from './pages/PaginaCalculadora'
import PaginaLeis from './pages/PaginaLeis'
import { capitulos } from './data/capitulos'

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const renderContent = () => {
    switch(activeSection) {
      case 'glossario':
        return <PaginaGlossario />
      case 'calculadora':
        return <PaginaCalculadora />
      case 'leis':
        return <PaginaLeis />
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
            </select>
          </div>

          {renderContent()}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
