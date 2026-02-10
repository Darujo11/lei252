const fs = require('fs');
const path = 'c:\\Users\\CLIENTE\\gitlei252\\lei252\\src\\components\\ArtigoCardEditavel.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Encontrar a linha de corte
const cutIndex = lines.findIndex(l => l.includes('{/* Parágrafos */}'));
// O findIndex retorna a primeira ocorrência. No arquivo corrompido, pode ter mais.
// Mas queremos substituir a partir da primeira ocorrência legítima (linha 482)

if (cutIndex === -1) {
    console.error('Marcação não encontrada!');
    process.exit(1);
}

const header = lines.slice(0, cutIndex).join('\n');

const newContent = `
            {/* Parágrafos */}
            {(artigo.paragrafos?.length > 0 || paragrafosEditados.length > 0 || editando) && (
                <div className="mt-4 space-y-3">
                    {editando ? (
                        <SortableContext 
                            items={paragrafosEditados.map((_, idx) => \`paragrafo-\${idx}\`)}
                            strategy={verticalListSortingStrategy}
                        >
                        {paragrafosEditados.map((par, idx) => (
                        <SortableItem key={\`par-edit-\${idx}\`} id={\`paragrafo-\${idx}\`}>
                            {(dragAttributes, dragListeners) => (
                            <div className={\`\${par.revogado ? 'opacity-60' : ''} p-3 border border-gray-200 rounded-lg bg-gray-50\`}>
                                <div className="flex gap-2">
                                <span className="font-semibold text-gray-500 shrink-0">
                                    {par.numero === 'único' ? 'Parágrafo único -' : \`§ \${par.numero}\`}
                                </span>
                                <div className="flex-1">
                                    <div className="space-y-2">
                                        {/* Barra de ferramentas do parágrafo */}
                                        <div className="flex gap-2 items-center">
                                            {/* Handle de Drag */}
                                            <button 
                                                type="button"
                                                {...dragAttributes} 
                                                {...dragListeners} 
                                                className="cursor-grab text-gray-400 hover:text-gray-600 p-1"
                                                title="Arrastar parágrafo"
                                            >
                                                <GripVertical size={16} />
                                            </button>

                                            <div className="flex gap-1 mr-2 border-r pr-2 border-gray-200">
                                                <button
                                                    type="button"
                                                    onClick={() => handleMoverParagrafo(idx, -1)}
                                                    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 disabled:opacity-30"
                                                    title="Mover para cima"
                                                    disabled={idx === 0}
                                                >
                                                    <ArrowUp size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleMoverParagrafo(idx, 1)}
                                                    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 disabled:opacity-30"
                                                    title="Mover para baixo"
                                                    disabled={idx === paragrafosEditados.length - 1}
                                                >
                                                    <ArrowDown size={14} />
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => aplicarNegrito(\`paragrafo-\${artigo.numero}-\${idx}\`, paragrafosEditados[idx]?.texto || '', (novoTexto) => handleParagrafoChange(idx, 'texto', novoTexto))}
                                                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
                                                title="Aplicar negrito (selecione o texto primeiro)"
                                            >
                                                <Bold size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeletarParagrafo(idx)}
                                                className="p-1.5 bg-red-100 hover:bg-red-200 rounded text-red-600"
                                                title="Deletar parágrafo"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <textarea
                                            id={\`paragrafo-\${artigo.numero}-\${idx}\`}
                                            value={paragrafosEditados[idx]?.texto || ''}
                                            onChange={(e) => handleParagrafoChange(idx, 'texto', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-600 text-sm min-h-[60px] resize-y"
                                        />
                                        {/* Status do Parágrafo */}
                                        <div className="flex flex-wrap gap-3 text-xs">
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="checkbox"
                                                    checked={paragrafosEditados[idx]?.alterado || false}
                                                    onChange={(e) => handleParagrafoChange(idx, 'alterado', e.target.checked)}
                                                    className="w-3 h-3 rounded border-gray-300 text-amber-600"
                                                />
                                                <span className="text-amber-700">Alterado</span>
                                                {paragrafosEditados[idx]?.alterado && (
                                                    <input
                                                        type="text"
                                                        value={paragrafosEditados[idx]?.alteradoPor || paragrafosEditados[idx]?.fonte || ''}
                                                        onChange={(e) => handleParagrafoChange(idx, 'alteradoPor', e.target.value)}
                                                        placeholder="lc280"
                                                        className="px-1.5 py-0.5 text-xs border border-amber-300 rounded w-20"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="checkbox"
                                                    checked={paragrafosEditados[idx]?.acrescido || false}
                                                    onChange={(e) => handleParagrafoChange(idx, 'acrescido', e.target.checked)}
                                                    className="w-3 h-3 rounded border-gray-300 text-green-600"
                                                />
                                                <span className="text-green-700">Acrescido</span>
                                                {paragrafosEditados[idx]?.acrescido && (
                                                    <input
                                                        type="text"
                                                        value={paragrafosEditados[idx]?.acrescidoPor || paragrafosEditados[idx]?.fonte || ''}
                                                        onChange={(e) => handleParagrafoChange(idx, 'acrescidoPor', e.target.value)}
                                                        placeholder="lc280"
                                                        className="px-1.5 py-0.5 text-xs border border-green-300 rounded w-20"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="checkbox"
                                                    checked={paragrafosEditados[idx]?.revogado || false}
                                                    onChange={(e) => handleParagrafoChange(idx, 'revogado', e.target.checked)}
                                                    className="w-3 h-3 rounded border-gray-300 text-red-600"
                                                />
                                                <span className="text-red-700">Revogado</span>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                            </div>
                            )}
                        </SortableItem>
                        ))}
                        </SortableContext>
                    ) : ( 
                        // MODO VISUALIZAÇÃO (NÃO DRAGGABLE)
                        artigo.paragrafos?.map((par, idx) => (
                        <div key={idx} className={\`\${par.revogado ? 'opacity-60' : ''}\`}>
                            <div className="flex gap-2">
                                <span className="font-semibold text-gray-500 shrink-0">
                                    {par.numero === 'único' ? 'Parágrafo único -' : \`§ \${par.numero}\`}
                                </span>
                                <div className="flex-1">
                                    <span className={\`text-gray-600 \${par.revogado ? 'line-through' : ''}\`}>{par.texto}</span>
                                    <LeiBadge lei={par.fonte} />
                                    {par.alterado && (
                                        <span className="artigo-badge alterado ml-2 text-[10px]">
                                            Alterado {par.alteradoPor && \`(\${par.alteradoPor})\`}
                                        </span>
                                    )}
                                    {par.acrescido && (
                                        <span className="artigo-badge acrescido ml-2 text-[10px]">
                                            Acrescido {par.acrescidoPor && \`(\${par.acrescidoPor})\`}
                                        </span>
                                    )}
                                    {par.revogado && <span className="artigo-badge revogado ml-2 text-[10px]">Revogado</span>}
                                </div>
                            </div>
                        </div>
                    )))}
                    {editando && (
                        <button
                            onClick={handleAdicionarParagrafo}
                            className="mt-2 text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1 font-medium px-2 py-1 hover:bg-brand-50 rounded"
                        >
                            <Plus size={16} />
                            Adicionar Parágrafo
                        </button>
                    )}
                </div>
            )}

            {/* Incisos */}
            {(artigo.incisos?.length > 0 || incisosEditados.length > 0 || editando) && (
                <div className="mt-4 ml-4 space-y-3 border-t border-gray-100 pt-4">
                    {editando ? (
                        <SortableContext items={incisosEditados.map((_, idx) => \`inciso-\${idx}\`)} strategy={verticalListSortingStrategy}>
                        {incisosEditados.map((inciso, idx) => (
                        <SortableItem key={\`inc-edit-\${idx}\`} id={\`inciso-\${idx}\`}>
                            {(dragAttributes, dragListeners) => (
                            <div className={\`\${inciso.revogado ? 'opacity-60' : ''} p-3 border border-gray-200 rounded-lg bg-gray-50\`}>
                            <div className="flex gap-2">
                                <span className="font-semibold text-brand-600 shrink-0">{inciso.numero} –</span>
                                <div className="flex-1">
                                        <div className="space-y-2">
                                            {/* Barra de ferramentas do inciso */}
                                            <div className="flex gap-2 items-center">
                                                {/* Handle */}
                                                <button 
                                                    type="button"
                                                    {...dragAttributes} 
                                                    {...dragListeners} 
                                                    className="cursor-grab text-gray-400 hover:text-gray-600 p-1"
                                                    title="Arrastar inciso"
                                                >
                                                    <GripVertical size={16} />
                                                </button>

                                                <div className="flex gap-1 mr-2 border-r pr-2 border-gray-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMoverInciso(idx, -1)}
                                                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 disabled:opacity-30"
                                                        title="Mover para cima"
                                                        disabled={idx === 0}
                                                    >
                                                        <ArrowUp size={14} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMoverInciso(idx, 1)}
                                                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 disabled:opacity-30"
                                                        title="Mover para baixo"
                                                        disabled={idx === incisosEditados.length - 1}
                                                    >
                                                        <ArrowDown size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => aplicarNegrito(\`inciso-\${artigo.numero}-\${idx}\`, incisosEditados[idx]?.texto || '', (novoTexto) => handleIncisoChange(idx, 'texto', novoTexto))}
                                                    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
                                                    title="Aplicar negrito (selecione o texto primeiro)"
                                                >
                                                    <Bold size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeletarInciso(idx)}
                                                    className="p-1.5 bg-red-100 hover:bg-red-200 rounded text-red-600"
                                                    title="Deletar inciso"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <textarea
                                                id={\`inciso-\${artigo.numero}-\${idx}\`}
                                                value={incisosEditados[idx]?.texto || ''}
                                                onChange={(e) => handleIncisoChange(idx, 'texto', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-600 text-sm min-h-[60px] resize-y"
                                            />
                                            {/* Status do Inciso */}
                                            <div className="flex flex-wrap gap-3 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={incisosEditados[idx]?.alterado || false}
                                                        onChange={(e) => handleIncisoChange(idx, 'alterado', e.target.checked)}
                                                        className="w-3 h-3 rounded border-gray-300 text-amber-600"
                                                    />
                                                    <span className="text-amber-700">Alterado</span>
                                                    {incisosEditados[idx]?.alterado && (
                                                        <input
                                                            type="text"
                                                            value={incisosEditados[idx]?.alteradoPor || incisosEditados[idx]?.fonte || ''}
                                                            onChange={(e) => handleIncisoChange(idx, 'alteradoPor', e.target.value)}
                                                            placeholder="lc280"
                                                            className="px-1.5 py-0.5 text-xs border border-amber-300 rounded w-20"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={incisosEditados[idx]?.acrescido || false}
                                                        onChange={(e) => handleIncisoChange(idx, 'acrescido', e.target.checked)}
                                                        className="w-3 h-3 rounded border-gray-300 text-green-600"
                                                    />
                                                    <span className="text-green-700">Acrescido</span>
                                                    {incisosEditados[idx]?.acrescido && (
                                                        <input
                                                            type="text"
                                                            value={incisosEditados[idx]?.acrescidoPor || incisosEditados[idx]?.fonte || ''}
                                                            onChange={(e) => handleIncisoChange(idx, 'acrescidoPor', e.target.value)}
                                                            placeholder="lc280"
                                                            className="px-1.5 py-0.5 text-xs border border-green-300 rounded w-20"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={incisosEditados[idx]?.revogado || false}
                                                        onChange={(e) => handleIncisoChange(idx, 'revogado', e.target.checked)}
                                                        className="w-3 h-3 rounded border-gray-300 text-red-600"
                                                    />
                                                    <span className="text-red-700">Revogado</span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        )}
                        </SortableItem> 
                        ))}
                        </SortableContext>
                    ) : (
                        artigo.incisos?.map((inciso, idx) => (
                        <div key={idx} className={\`\${inciso.revogado ? 'opacity-60' : ''}\`}>
                            <div className="flex gap-2">
                                <span className="font-semibold text-brand-600 shrink-0">{inciso.numero} –</span>
                                <div className="flex-1">
                                    <span className={\`text-gray-600 \${inciso.revogado ? 'line-through' : ''}\`}>{inciso.texto}</span>
                                    <LeiBadge lei={inciso.fonte} />
                                    {inciso.alterado && (
                                        <span className="artigo-badge alterado ml-2 text-[10px]">
                                            Alterado {inciso.alteradoPor && \`(\${inciso.alteradoPor})\`}
                                        </span>
                                    )}
                                    {inciso.acrescido && (
                                        <span className="artigo-badge acrescido ml-2 text-[10px]">
                                            Acrescido {inciso.acrescidoPor && \`(\${inciso.acrescidoPor})\`}
                                        </span>
                                    )}
                                    {inciso.revogado && <span className="artigo-badge revogado ml-2 text-[10px]">Revogado</span>}
                                </div>
                            </div>
                        </div>
                    )))}
                    {editando && (
                        <button
                            onClick={handleAdicionarInciso}
                            className="mt-2 text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1 font-medium px-2 py-1 hover:bg-brand-50 rounded"
                        >
                            <Plus size={16} />
                            Adicionar Inciso
                        </button>
                    )}
                </div>
            )}
            </DndContext>
        </div>
    )
}
`;

fs.writeFileSync(path, header + newContent);
console.log('Arquivo recriado com sucesso!');
