import { ExternalLink } from 'lucide-react'
import { getLeiInfo } from '../data/leis'

export default function LeiBadge({ lei }) {
  const info = getLeiInfo(lei)
  
  if (!info) return null

  return (
    <a 
      href={info.arquivo} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`lei-badge ${info.cor}`} 
      title={`Clique para abrir: ${info.desc}`}
      onClick={(e) => e.stopPropagation()}
    >
      {info.nome}
      <ExternalLink size={10} className="opacity-70" />
    </a>
  )
}
