import { FileText, ExternalLink, Download, FolderOpen } from 'lucide-react'
import { leisOrdemCronologica } from '../data/leis'

export default function PaginaLeis() {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <FileText className="text-brand-600" /> Leis Originais
        </h1>
        <p className="text-gray-500">
          Clique para abrir o documento PDF oficial de cada lei
        </p>
      </div>

      <div className="space-y-4">
        {leisOrdemCronologica.map((lei, i) => (
          <a
            key={i}
            href={lei.arquivo}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-xl p-5 shadow-sm border border-gray-100 card-lift hover:border-brand-300 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                lei.id === 'lc252' ? 'bg-blue-100' :
                lei.id === 'lc284' ? 'bg-purple-100' :
                lei.id === 'lc294' ? 'bg-cyan-100' :
                lei.id === 'lc341' ? 'bg-red-100' :
                lei.id === 'lc343' ? 'bg-orange-100' :
                'bg-green-100'
              }`}>
                <FileText className={`${
                  lei.id === 'lc252' ? 'text-blue-600' :
                  lei.id === 'lc284' ? 'text-purple-600' :
                  lei.id === 'lc294' ? 'text-cyan-600' :
                  lei.id === 'lc341' ? 'text-red-600' :
                  lei.id === 'lc343' ? 'text-orange-600' :
                  'text-green-600'
                }`} size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800 group-hover:text-brand-600 transition-colors">
                    {lei.nomeCompleto}
                  </h3>
                  <ExternalLink size={14} className="text-gray-400 group-hover:text-brand-500" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{lei.ementa}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`lei-badge ${lei.cor}`}>{lei.nome}</span>
                  <span className="text-xs text-gray-400">{lei.data}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                    <Download size={12} /> Abrir PDF
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
