import { Search, X } from 'lucide-react'

export default function Header({ searchTerm, setSearchTerm, showSearch, setShowSearch }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-brand-600">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-brand-800">Lei Complementar 252/2016</h1>
              <p className="text-xs text-gray-500">Plano de Cargos, Carreiras e Vencimentos - CMM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showSearch && (
              <div className="relative animate-fade-in">
                <input
                  type="text"
                  placeholder="Buscar na lei..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48 md:w-64 px-4 py-2 pr-10 rounded-lg border-2 border-gray-200 focus:border-brand-500 focus:outline-none text-sm"
                  autoFocus
                />
                <button 
                  onClick={() => {setShowSearch(false); setSearchTerm('');}} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            {!showSearch && (
              <button 
                onClick={() => setShowSearch(true)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                title="Buscar"
              >
                <Search size={20} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
