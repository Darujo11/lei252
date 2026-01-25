import { Shield } from 'lucide-react'

export default function Footer({ onNavegar }) {
  return (
    <footer className="bg-brand-950 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-brand-200 text-sm">
          Portal de Consulta - Lei Complementar 252/2016
        </p>
        <p className="text-brand-300 text-xs mt-2">
          Câmara Municipal de Macaé - Texto consolidado com todas as alterações até LC 355/2025
        </p>

        {/* Link Privacidade */}
        <div className="mt-4 mb-2">
          <button
            onClick={() => onNavegar('privacidade')}
            className="inline-flex items-center gap-1 text-brand-300 hover:text-white text-xs transition-colors underline"
          >
            <Shield size={12} />
            Política de Privacidade e Cookies
          </button>
        </div>

        <p className="text-brand-400 text-xs mt-2">
          ⚠️ Para consulta. O texto oficial é o publicado no Diário Oficial.
        </p>
      </div>
    </footer>
  )
}
