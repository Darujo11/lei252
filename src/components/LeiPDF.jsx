import React from 'react';
import LeiBadge from './LeiBadge';

const LeiPDF = ({ capitulos }) => {
    return (
        <div className="p-8 bg-white text-gray-800 font-sans" id="conteudo-lei-pdf">
            <style>
                {`
          .break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .pdf-header {
             margin-bottom: 2rem;
             text-align: center;
             border-bottom: 2px solid #e5e7eb;
             padding-bottom: 1rem;
          }
        `}
            </style>

            {/* Cabeçalho */}
            <div className="pdf-header">
                <h1 className="text-3xl font-bold mb-2 uppercase text-gray-900">Lei Complementar nº 252/2016</h1>
                <p className="text-lg mb-2 text-gray-700">Plano de Cargos, Carreiras e Vencimentos dos Servidores da Câmara Municipal de Macaé</p>
                <p className="text-sm italic text-blue-600">Texto consolidado com alterações até a Lei Complementar nº 355/2025</p>
            </div>

            {/* Preâmbulo */}
            <div className="mb-8 text-justify italic px-8 text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 break-inside-avoid">
                <p className="mb-4">
                    "Dispõe sobre a estruturação do Plano de Cargos, Carreiras e Vencimentos dos Servidores da Câmara Municipal de Macaé e dá outras providências."
                </p>
                <p>
                    O Presidente da Câmara Municipal de Macaé, Estado do Rio de Janeiro, faz saber que a Câmara Municipal aprovou e ele, em seu nome, promulga a seguinte Lei Complementar:
                </p>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6">
                {capitulos.map((capitulo) => (
                    <div key={capitulo.id} className="mb-8 break-inside-avoid">
                        <div className="bg-brand-50 rounded-lg p-4 mb-4 border-l-4 border-brand-500">
                            <h2 className="text-xl font-bold uppercase text-brand-800">
                                CAPÍTULO {capitulo.numero}
                            </h2>
                            <h3 className="text-lg font-medium text-brand-700">
                                {capitulo.titulo}
                            </h3>
                        </div>

                        {capitulo.secoes.map((secao) => (
                            <div key={secao.id} className="mb-6 break-inside-avoid">
                                <div className="flex items-center gap-2 mb-3 pb-1 border-b border-gray-200">
                                    <div className="w-1.5 h-6 bg-brand-400 rounded-full"></div>
                                    <h4 className="text-md font-bold uppercase text-gray-700">
                                        {secao.titulo}
                                    </h4>
                                </div>

                                {secao.artigos.map((artigo) => (
                                    <div key={artigo.numero} className={`bg-white rounded-xl shadow-sm border p-5 mb-4 break-inside-avoid ${artigo.revogado ? 'border-l-4 border-l-red-500 bg-red-50/50' : artigo.acrescido ? 'border-l-4 border-l-green-500 bg-green-50/30' : artigo.alterado ? 'border-l-4 border-l-amber-500 bg-amber-50/30' : 'border-l-4 border-l-gray-200'}`}>

                                        {/* Cabeçalho do Artigo */}
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className="font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded text-sm">Art. {artigo.numero}</span>
                                            <LeiBadge lei={artigo.fonte} />
                                            {artigo.alterado && (
                                                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 font-medium">
                                                    ✏️ Alterado {artigo.alteradoPor && `(${artigo.alteradoPor})`}
                                                </span>
                                            )}
                                            {artigo.acrescido && (
                                                <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded border border-green-200 font-medium">
                                                    ➕ Acrescido {artigo.acrescidoPor && `(${artigo.acrescidoPor})`}
                                                </span>
                                            )}
                                            {artigo.revogado && (
                                                <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded border border-red-200 font-medium">
                                                    ❌ Revogado {artigo.revogadoPor && `(${artigo.revogadoPor})`}
                                                </span>
                                            )}
                                        </div>

                                        {/* Texto Principal */}
                                        <div className="mb-1 text-justify">
                                            <span className={`text-gray-700 leading-relaxed ${artigo.revogado ? 'line-through text-gray-400' : ''}`}>
                                                {artigo.texto}
                                            </span>
                                        </div>

                                        {/* Incisos */}
                                        {artigo.incisos && artigo.incisos.length > 0 && (
                                            <div className="mt-4 ml-4 space-y-2 border-t border-gray-100 pt-4">
                                                {artigo.incisos.map((inciso, idx) => (
                                                    <div key={idx} className={`flex gap-2 text-justify ${inciso.revogado ? 'line-through text-gray-400' : ''}`}>
                                                        <span className="font-semibold text-brand-600 shrink-0">{inciso.numero} –</span>
                                                        <div className="flex-1">
                                                            <span className="text-gray-600">{inciso.texto}</span>
                                                            <div className="inline-flex gap-1 ml-2 align-middle">
                                                                <LeiBadge lei={inciso.fonte} />
                                                                {inciso.alterado && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 whitespace-nowrap">Alterado {inciso.alteradoPor && `(${inciso.alteradoPor})`}</span>}
                                                                {inciso.acrescido && <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded border border-green-200 whitespace-nowrap">Acrescido {inciso.acrescidoPor && `(${inciso.acrescidoPor})`}</span>}
                                                                {inciso.revogado && <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded border border-red-200 whitespace-nowrap">Revogado {inciso.revogadoPor && `(${inciso.revogadoPor})`}</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Parágrafos */}
                                        {artigo.paragrafos && artigo.paragrafos.length > 0 && (
                                            <div className="mt-4 space-y-3">
                                                {artigo.paragrafos.map((par, idx) => (
                                                    <div key={idx} className={`flex gap-2 text-justify ${par.revogado ? 'line-through text-gray-400' : ''}`}>
                                                        <span className="font-semibold text-gray-500 shrink-0">
                                                            {par.numero === 'único' ? 'Parágrafo único -' : `§ ${par.numero}`}
                                                        </span>
                                                        <div className="flex-1">
                                                            <span className="text-gray-600">
                                                                {par.texto.startsWith('Parágrafo único.') || par.texto.startsWith('Parágrafo único -')
                                                                    ? par.texto.replace(/^Parágrafo único[.-]\s*/, '')
                                                                    : par.texto}
                                                            </span>
                                                            <div className="inline-flex gap-1 ml-2 align-middle">
                                                                <LeiBadge lei={par.fonte} />
                                                                {par.alterado && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 whitespace-nowrap">Alterado {par.alteradoPor && `(${par.alteradoPor})`}</span>}
                                                                {par.acrescido && <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded border border-green-200 whitespace-nowrap">Acrescido {par.acrescidoPor && `(${par.acrescidoPor})`}</span>}
                                                                {par.revogado && <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded border border-red-200 whitespace-nowrap">Revogado {par.revogadoPor && `(${par.revogadoPor})`}</span>}
                                                            </div>

                                                            {/* Incisos dentro do Parágrafo */}
                                                            {par.incisos && par.incisos.length > 0 && (
                                                                <div className="mt-2 ml-4 space-y-1 bg-gray-50/50 p-2 rounded">
                                                                    {par.incisos.map((inciso, incisoIdx) => (
                                                                        <div key={incisoIdx} className={`flex gap-2 ${inciso.revogado ? 'opacity-60' : ''}`}>
                                                                            <span className="font-semibold text-brand-600 shrink-0 text-sm">{inciso.numero} –</span>
                                                                            <div className="flex-1">
                                                                                <span className={`text-gray-600 text-sm ${inciso.revogado ? 'line-through' : ''}`}>{inciso.texto}</span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Rodapé */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center break-inside-avoid">
                <p className="font-bold text-gray-800">Macaé, 30 de março de 2016.</p>
                <div className="mt-8 grid grid-cols-2 gap-8">
                    <div>
                        <p className="font-bold text-gray-900">EDUARDO CARDOSO GONÇALVES DA SILVA</p>
                        <p className="text-sm text-gray-600">PRESIDENTE</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">WELBERTH PORTO DE REZENDE</p>
                        <p className="text-sm text-gray-600">1º SECRETÁRIO</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeiPDF;
