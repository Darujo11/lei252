
import React from 'react';
import { leisOrdemCronologica } from '../data/leis';

const LeiPDF = ({ capitulos }) => {
    return (
        <div className="p-8 bg-white text-black font-serif" id="conteudo-lei-pdf">
            {/* Cabeçalho */}
            <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h1 className="text-3xl font-bold mb-2 uppercase">Lei Complementar nº 252/2016</h1>
                <p className="text-lg mb-2">Plano de Cargos, Carreiras e Vencimentos dos Servidores da Câmara Municipal de Macaé</p>
                <p className="text-sm italic">Texto consolidado com alterações até a Lei Complementar nº 355/2025</p>
            </div>

            {/* Preâmbulo */}
            <div className="mb-8 text-justify italic px-8">
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
                    <div key={capitulo.id} className="mb-6">
                        <h2 className="text-xl font-bold text-center uppercase mb-1 mt-6">
                            CAPÍTULO {capitulo.numero}
                        </h2>
                        <h3 className="text-lg font-bold text-center mb-4 text-gray-700">
                            {capitulo.titulo}
                        </h3>

                        {capitulo.secoes.map((secao) => (
                            <div key={secao.id} className="mb-4">
                                <h4 className="text-md font-bold uppercase mb-2 mt-4 ml-2">
                                    {secao.titulo}
                                </h4>

                                {secao.artigos.map((artigo) => (
                                    <div key={artigo.numero} className="mb-3 ml-2 text-justify">
                                        {/* Cabeçalho do Artigo */}
                                        <div className="mb-1">
                                            <span className="font-bold mr-2">Art. {artigo.numero}.</span>
                                            <span className={artigo.revogado ? 'line-through text-gray-500' : ''}>
                                                {artigo.texto}
                                            </span>
                                            {artigo.revogado && <span className="text-xs ml-1 font-bold text-red-600">[REVOGADO]</span>}
                                        </div>

                                        {/* Incisos */}
                                        {artigo.incisos && artigo.incisos.length > 0 && (
                                            <div className="ml-8 mt-1 space-y-1">
                                                {artigo.incisos.map((inciso, idx) => (
                                                    <div key={idx} className="flex">
                                                        <span className="mr-2 min-w-[20px] text-right">{inciso.numero} –</span>
                                                        <span className={inciso.revogado ? 'line-through text-gray-500' : ''}>
                                                            {inciso.texto}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Parágrafos */}
                                        {artigo.paragrafos && artigo.paragrafos.length > 0 && (
                                            <div className="ml-4 mt-2 space-y-1">
                                                {artigo.paragrafos.map((par, idx) => (
                                                    <div key={idx} className="text-justify">
                                                        <span className="font-bold mr-2">
                                                            {par.numero === 'único' ? 'Parágrafo único.' : `§ ${par.numero}`}
                                                        </span>
                                                        <span className={par.revogado ? 'line-through text-gray-500' : ''}>
                                                            {par.texto}
                                                        </span>
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
            <div className="mt-12 pt-8 border-t border-black text-center">
                <p className="font-bold">Macaé, 30 de março de 2016.</p>
                <div className="mt-8 grid grid-cols-2 gap-8">
                    <div>
                        <p className="font-bold">EDUARDO CARDOSO GONÇALVES DA SILVA</p>
                        <p className="text-sm">PRESIDENTE</p>
                    </div>
                    <div>
                        <p className="font-bold">WELBERTH PORTO DE REZENDE</p>
                        <p className="text-sm">1º SECRETÁRIO</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeiPDF;
