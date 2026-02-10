import LeiBadge from './LeiBadge'

export default function ArtigoCard({ artigo, searchTerm }) {
  // Função para renderizar texto com HTML (negrito, etc.)
  const renderTextoComFormatacao = (texto) => {
    // Se o texto contém tags HTML, renderiza como HTML
    if (texto && (texto.includes('<strong>') || texto.includes('<b>'))) {
      return <span dangerouslySetInnerHTML={{ __html: texto }} />
    }
    return texto
  }

  const highlightText = (text) => {
    if (!searchTerm || searchTerm.length < 2) return renderTextoComFormatacao(text)

    // Se tem formatação HTML, apenas retorna com formatação
    if (text && (text.includes('<strong>') || text.includes('<b>'))) {
      return <span dangerouslySetInnerHTML={{ __html: text }} />
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi')
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="highlight-search">{part}</mark> : part
    )
  }

  const getStatusClass = () => {
    if (artigo.revogado) return 'border-l-red-500 bg-red-50/50'
    if (artigo.acrescido) return 'border-l-green-500 bg-green-50/30'
    if (artigo.alterado) return 'border-l-amber-500 bg-amber-50/30'
    if (artigo.destaque) return 'border-l-brand-500 bg-brand-50/30'
    return 'border-l-gray-200'
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 p-5 mb-4 card-lift ${getStatusClass()}`}>
      {/* Cabeçalho do Artigo */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="artigo-badge">Art. {artigo.numero}</span>
        <LeiBadge lei={artigo.fonte} />
        {artigo.alterado && (
          <span className="artigo-badge alterado">
            ✏️ Alterado {artigo.alteradoPor && `(${artigo.alteradoPor})`}
          </span>
        )}
        {artigo.acrescido && (
          <span className="artigo-badge acrescido">
            ➕ Acrescido {artigo.acrescidoPor && `(${artigo.acrescidoPor})`}
          </span>
        )}
        {artigo.revogado && (
          <span className="artigo-badge revogado">
            ❌ Revogado {artigo.revogadoPor && `(${artigo.revogadoPor})`}
          </span>
        )}
      </div>

      {/* Texto Principal */}
      <p className={`text-gray-700 leading-relaxed ${artigo.revogado ? 'line-through text-gray-400' : ''}`}>
        {highlightText(artigo.texto)}
      </p>

      {/* Incisos */}
      {artigo.incisos && artigo.incisos.length > 0 && (
        <div className="mt-4 ml-4 space-y-2 border-t border-gray-100 pt-4">
          {artigo.incisos.map((inciso, idx) => (
            <div key={idx} className={`flex gap-2 ${inciso.revogado ? 'line-through text-gray-400' : ''}`}>
              <span className="font-semibold text-brand-600 shrink-0">{inciso.numero} –</span>
              <div className="flex-1 flex flex-wrap items-center gap-1">
                <span className="text-gray-600">{highlightText(inciso.texto)}</span>
                <LeiBadge lei={inciso.fonte} />
                {inciso.alterado && (
                  <span className="artigo-badge alterado ml-2 text-[10px]">
                    Alterado {inciso.alteradoPor && `(${inciso.alteradoPor})`}
                  </span>
                )}
                {inciso.acrescido && (
                  <span className="artigo-badge acrescido ml-2 text-[10px]">
                    Acrescido {inciso.acrescidoPor && `(${inciso.acrescidoPor})`}
                  </span>
                )}
                {inciso.revogado && (
                  <span className="artigo-badge revogado ml-2 text-[10px]">Revogado</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Parágrafos */}
      {artigo.paragrafos && artigo.paragrafos.length > 0 && (
        <div className="mt-4 space-y-3">
          {artigo.paragrafos.map((par, idx) => (
            <div key={idx} className={`flex gap-2 ${par.revogado ? 'line-through text-gray-400' : ''}`}>
              <span className="font-semibold text-gray-500 shrink-0">
                {par.numero === 'único' ? 'Parágrafo único -' : `§ ${par.numero}`}
              </span>
              <div className="flex-1 flex flex-wrap items-center gap-1">
                <span className="text-gray-600">
                  {highlightText(
                    par.texto.startsWith('Parágrafo único.') || par.texto.startsWith('Parágrafo único -')
                      ? par.texto.replace(/^Parágrafo único[.-]\s*/, '')
                      : par.texto
                  )}
                </span>
                <LeiBadge lei={par.fonte} />
                {par.alterado && (
                  <span className="artigo-badge alterado ml-2 text-[10px]">
                    Alterado {par.alteradoPor && `(${par.alteradoPor})`}
                  </span>
                )}
                {par.acrescido && (
                  <span className="artigo-badge acrescido ml-2 text-[10px]">
                    Acrescido {par.acrescidoPor && `(${par.acrescidoPor})`}
                  </span>
                )}
                {par.revogado && (
                  <span className="artigo-badge revogado ml-2 text-[10px]">Revogado</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
