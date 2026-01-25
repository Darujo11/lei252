import { useState } from 'react'
import { Search } from 'lucide-react'
import { glossario } from '../data/glossario'
import LeiBadge from '../components/LeiBadge'

export default function PaginaGlossario() {
  const [busca, setBusca] = useState('')
  
  const termosFiltrados = glossario.filter(item => 
    item.termo.toLowerCase().includes(busca.toLowerCase()) ||
    item.definicao.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">📖 Glossário</h1>
        <p className="text-gray-500 mb-4">Definições e termos técnicos da Lei Complementar 252/2016</p>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar termo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {termosFiltrados.map(item => (
          <div key={item.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 card-lift">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="font-bold text-brand-700 text-lg">{item.termo}</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.artigo}</span>
              <LeiBadge lei={item.fonte} />
              {item.alterado && <LeiBadge lei={item.alterado} />}
              {item.acrescido && <span className="artigo-badge acrescido">Acrescido</span>}
              {item.revogado && <span className="artigo-badge revogado">Revogado</span>}
            </div>
            <p className={`text-gray-600 leading-relaxed ${item.revogado ? 'line-through text-gray-400' : ''}`}>
              {item.definicao}
            </p>
          </div>
        ))}
        
        {termosFiltrados.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Nenhum termo encontrado para "{busca}"
          </div>
        )}
      </div>
    </div>
  )
}
