import { useState, useRef } from 'react'
import { Edit2, Save, X, Check, Bold, Trash2, Plus, ArrowUp, ArrowDown, GripVertical } from 'lucide-react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import LeiBadge from './LeiBadge'

function toRoman(num) {
    if (num < 1) return "";
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';
    for (let i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}

function SortableItem({ id, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.5 : 1,
        position: 'relative'
    }

    return (
        <div ref={setNodeRef} style={style}>
            {/* Passamos atributos e listeners para o filho renderizar o handle onde quiser */}
            {children(attributes, listeners)}
        </div>
    )
}

export default function ArtigoCardEditavel({ artigo, onSave, onDelete, onMove, index, capituloId, secaoId }) {
    const [editando, setEditando] = useState(false)
    const [textoEditado, setTextoEditado] = useState(artigo.texto)
    const [alteradoEditado, setAlteradoEditado] = useState(artigo.alterado || false)
    const [alteradoPorEditado, setAlteradoPorEditado] = useState(artigo.alteradoPor || artigo.fonte || '')
    const [acrescidoEditado, setAcrescidoEditado] = useState(artigo.acrescido || false)
    const [acrescidoPorEditado, setAcrescidoPorEditado] = useState(artigo.acrescidoPor || artigo.fonte || '')
    const [revogadoEditado, setRevogadoEditado] = useState(artigo.revogado || false)
    const [revogadoPorEditado, setRevogadoPorEditado] = useState(artigo.revogadoPor || '')
    const [incisosEditados, setIncisosEditados] = useState(
        artigo.incisos?.map(i => ({ ...i })) || []
    )
    const [paragrafosEditados, setParagrafosEditados] = useState(
        artigo.paragrafos?.map(p => ({ ...p })) || []
    )
    const [salvando, setSalvando] = useState(false)
    const [salvoComSucesso, setSalvoComSucesso] = useState(false)
    const textareaRef = useRef(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const getStatusClass = () => {
        if (artigo.revogado) return 'border-l-red-500 bg-red-50/50'
        if (artigo.acrescido) return 'border-l-green-500 bg-green-50/30'
        if (artigo.alterado) return 'border-l-amber-500 bg-amber-50/30'
        if (artigo.destaque) return 'border-l-brand-500 bg-brand-50/30'
        return 'border-l-gray-200'
    }

    // Função para aplicar negrito no texto selecionado
    const aplicarNegrito = (textareaId, texto, setTexto) => {
        const textarea = document.getElementById(textareaId)
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const selectedText = texto.substring(start, end)

        if (selectedText) {
            const novoTexto = texto.substring(0, start) +
                '<strong>' + selectedText + '</strong>' +
                texto.substring(end)
            setTexto(novoTexto)
        }
    }

    // Função para deletar inciso
    const handleDeletarInciso = (index) => {
        if (confirm(`Tem certeza que deseja deletar o inciso ${incisosEditados[index]?.numero}?`)) {
            const novosIncisos = incisosEditados.filter((_, i) => i !== index)
            setIncisosEditados(novosIncisos)
        }
    }

    // Função para deletar parágrafo
    const handleDeletarParagrafo = (index) => {
        if (confirm(`Tem certeza que deseja deletar o § ${paragrafosEditados[index]?.numero}?`)) {
            const novosParagrafos = paragrafosEditados.filter((_, i) => i !== index)
            setParagrafosEditados(novosParagrafos)
        }
    }

    // Função para mover inciso
    const handleMoverInciso = (idx, direction) => {
        const novosIncisos = [...incisosEditados]
        const novoIdx = idx + direction
        if (novoIdx < 0 || novoIdx >= novosIncisos.length) return

        const temp = novosIncisos[idx]
        novosIncisos[idx] = novosIncisos[novoIdx]
        novosIncisos[novoIdx] = temp
        setIncisosEditados(novosIncisos)
    }

    // Função para mover parágrafo
    const handleMoverParagrafo = (idx, direction) => {
        const novosParagrafos = [...paragrafosEditados]
        const novoIdx = idx + direction
        if (novoIdx < 0 || novoIdx >= novosParagrafos.length) return

        const temp = novosParagrafos[idx]
        novosParagrafos[idx] = novosParagrafos[novoIdx]
        novosParagrafos[novoIdx] = temp
        setParagrafosEditados(novosParagrafos)
    }

    // Handler Drag End Local
    const handleDragEndLocal = (event) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        // IDs: inciso-{idx} ou paragrafo-{idx}
        const activeId = String(active.id)
        const overId = String(over.id)

        if (activeId.startsWith('inciso-') && overId.startsWith('inciso-')) {
            const oldIdx = parseInt(activeId.replace('inciso-', ''))
            const newIdx = parseInt(overId.replace('inciso-', ''))
            setIncisosEditados(items => arrayMove(items, oldIdx, newIdx))
        } else if (activeId.startsWith('paragrafo-') && overId.startsWith('paragrafo-')) {
            const oldIdx = parseInt(activeId.replace('paragrafo-', ''))
            const newIdx = parseInt(overId.replace('paragrafo-', ''))
            setParagrafosEditados(items => arrayMove(items, oldIdx, newIdx))
        }
    }


    // Função para deletar artigo
    const handleDeletarArtigo = () => {
        if (confirm(`Tem certeza que deseja deletar o Art. ${artigo.numero}? Esta ação não pode ser desfeita!`)) {
            if (onDelete) {
                onDelete(capituloId, secaoId, artigo.numero)
            }
        }
    }

    const handleIniciarEdicao = () => {
        setTextoEditado(artigo.texto)
        setAlteradoEditado(artigo.alterado || false)
        setAlteradoPorEditado(artigo.alteradoPor || artigo.fonte || '')
        setAcrescidoEditado(artigo.acrescido || false)
        setAcrescidoPorEditado(artigo.acrescidoPor || artigo.fonte || '')
        setRevogadoEditado(artigo.revogado || false)
        setRevogadoPorEditado(artigo.revogadoPor || '')
        setIncisosEditados(artigo.incisos?.map(i => ({ ...i })) || [])
        setParagrafosEditados(artigo.paragrafos?.map(p => ({ ...p })) || [])
        setEditando(true)
    }

    const handleCancelar = () => {
        setTextoEditado(artigo.texto)
        setAlteradoEditado(artigo.alterado || false)
        setAlteradoPorEditado(artigo.alteradoPor || artigo.fonte || '')
        setAcrescidoEditado(artigo.acrescido || false)
        setAcrescidoPorEditado(artigo.acrescidoPor || artigo.fonte || '')
        setRevogadoEditado(artigo.revogado || false)
        setRevogadoPorEditado(artigo.revogadoPor || '')
        setIncisosEditados(artigo.incisos?.map(i => ({ ...i })) || [])
        setParagrafosEditados(artigo.paragrafos?.map(p => ({ ...p })) || [])
        setEditando(false)
    }

    const handleSalvar = async () => {
        setSalvando(true)

        const artigoAtualizado = {
            ...artigo,
            texto: textoEditado,
            alterado: alteradoEditado,
            alteradoPor: alteradoEditado ? alteradoPorEditado : undefined,
            acrescido: acrescidoEditado,
            acrescidoPor: acrescidoEditado ? acrescidoPorEditado : undefined,
            revogado: revogadoEditado,
            revogadoPor: revogadoEditado ? revogadoPorEditado : undefined,
            incisos: incisosEditados,
            paragrafos: paragrafosEditados
        }

        try {
            await onSave(capituloId, secaoId, artigo.numero, artigoAtualizado)
            setSalvoComSucesso(true)
            // Manter editando para continuar fazendo alterações
            // Mostrar feedback por 2 segundos
            setTimeout(() => {
                setSalvoComSucesso(false)
                setEditando(false)
            }, 1500)
        } catch (error) {
            console.error('Erro ao salvar:', error)
            alert('Erro ao salvar alterações')
        } finally {
            setSalvando(false)
        }
    }

    // Função para adicionar inciso
    const handleAdicionarInciso = () => {
        const proximoNumero = incisosEditados.length + 1
        const novoNumero = toRoman(proximoNumero)

        setIncisosEditados([...incisosEditados, {
            numero: novoNumero,
            texto: '',
            fonte: artigo.fonte,
            acrescido: true,
            acrescidoPor: ''
        }])
    }

    // Função para adicionar parágrafo
    const handleAdicionarParagrafo = () => {
        let novoNumero = '1º'
        if (paragrafosEditados.length === 0) {
            novoNumero = 'único'
        } else {
            const ultimo = paragrafosEditados[paragrafosEditados.length - 1].numero
            if (ultimo === 'único') {
                novoNumero = '2º'
            } else {
                const num = parseInt(ultimo)
                if (!isNaN(num)) {
                    novoNumero = `${num + 1}º`
                } else {
                    novoNumero = 'Novo'
                }
            }
        }

        setParagrafosEditados([...paragrafosEditados, {
            numero: novoNumero,
            texto: '',
            fonte: artigo.fonte,
            acrescido: true,
            acrescidoPor: ''
        }])
    }

    const handleIncisoChange = (index, campo, valor) => {
        const novosIncisos = [...incisosEditados]
        novosIncisos[index] = { ...novosIncisos[index], [campo]: valor }
        setIncisosEditados(novosIncisos)
    }

    const handleParagrafoChange = (index, campo, valor) => {
        const novosParagrafos = [...paragrafosEditados]
        novosParagrafos[index] = { ...novosParagrafos[index], [campo]: valor }
        setParagrafosEditados(novosParagrafos)
    }

    return (
        <div className={`bg-white rounded-xl shadow-sm border-l-4 p-5 mb-4 ${getStatusClass()} ${editando ? 'ring-2 ring-brand-500' : ''}`}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEndLocal}
            >
                {/* Cabeçalho do Artigo */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Botões de Mover Artigo */}
                        {!editando && onMove && (
                            <div className="flex flex-col gap-0.5 mr-2">
                                <button
                                    onClick={() => onMove(capituloId, secaoId, index, -1)}
                                    className="text-gray-400 hover:text-brand-600 p-0.5 hover:bg-gray-100 rounded"
                                    title="Mover para cima"
                                >
                                    <ArrowUp size={12} />
                                </button>
                                <button
                                    onClick={() => onMove(capituloId, secaoId, index, 1)}
                                    className="text-gray-400 hover:text-brand-600 p-0.5 hover:bg-gray-100 rounded"
                                    title="Mover para baixo"
                                >
                                    <ArrowDown size={12} />
                                </button>
                            </div>
                        )}
                        <span className="artigo-badge">Art. {artigo.numero}</span>
                        <LeiBadge lei={artigo.fonte} />
                        {!editando ? (
                            <>
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
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 ml-2">
                                {/* Alterado */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={alteradoEditado}
                                            onChange={(e) => setAlteradoEditado(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                        />
                                        <span className="text-amber-700">✏️ Alterado</span>
                                    </label>
                                    {alteradoEditado && (
                                        <input
                                            type="text"
                                            value={alteradoPorEditado}
                                            onChange={(e) => setAlteradoPorEditado(e.target.value)}
                                            placeholder="Ex: lc280, LC 355/2025"
                                            className="px-2 py-1 text-xs border border-amber-300 rounded focus:ring-1 focus:ring-amber-500 w-36"
                                        />
                                    )}
                                </div>
                                {/* Acrescido */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acrescidoEditado}
                                            onChange={(e) => setAcrescidoEditado(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-green-700">➕ Acrescido</span>
                                    </label>
                                    {acrescidoEditado && (
                                        <input
                                            type="text"
                                            value={acrescidoPorEditado}
                                            onChange={(e) => setAcrescidoPorEditado(e.target.value)}
                                            placeholder="Ex: lc280, LC 355/2025"
                                            className="px-2 py-1 text-xs border border-green-300 rounded focus:ring-1 focus:ring-green-500 w-36"
                                        />
                                    )}
                                </div>
                                {/* Revogado */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={revogadoEditado}
                                            onChange={(e) => setRevogadoEditado(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                        />
                                        <span className="text-red-700">❌ Revogado</span>
                                    </label>
                                    {revogadoEditado && (
                                        <input
                                            type="text"
                                            value={revogadoPorEditado}
                                            onChange={(e) => setRevogadoPorEditado(e.target.value)}
                                            placeholder="Ex: lc280, LC 355/2025"
                                            className="px-2 py-1 text-xs border border-red-300 rounded focus:ring-1 focus:ring-red-500 w-36"
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botões de ação */}
                    {!editando ? (
                        <div className="flex gap-2">
                            <button
                                onClick={handleIniciarEdicao}
                                className="px-3 py-1.5 text-sm bg-brand-100 text-brand-700 rounded-lg hover:bg-brand-200 transition-colors flex items-center gap-1.5"
                            >
                                <Edit2 size={14} />
                                Editar
                            </button>
                            <button
                                onClick={handleDeletarArtigo}
                                className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-1.5"
                                title="Deletar artigo"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSalvar}
                                disabled={salvando || salvoComSucesso}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 ${salvoComSucesso
                                    ? 'bg-green-700 text-white'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                            >
                                {salvoComSucesso ? (
                                    <>
                                        <Check size={14} />
                                        Salvo!
                                    </>
                                ) : salvando ? (
                                    <>Salvando...</>
                                ) : (
                                    <>
                                        <Save size={14} />
                                        Salvar
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleCancelar}
                                disabled={salvando}
                                className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-1.5"
                            >
                                <X size={14} />
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>

                {/* Texto Principal */}
                {editando ? (
                    <div className="space-y-2">
                        {/* Barra de ferramentas */}
                        <div className="flex gap-2 items-center">
                            <button
                                type="button"
                                onClick={() => aplicarNegrito(`artigo-texto-${artigo.numero}`, textoEditado, setTextoEditado)}
                                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-600"
                                title="Aplicar negrito (selecione o texto primeiro)"
                            >
                                <Bold size={14} />
                            </button>
                        </div>
                        <textarea
                            id={`artigo-texto-${artigo.numero}`}
                            value={textoEditado}
                            onChange={(e) => setTextoEditado(e.target.value)}
                            className="w-full p-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-gray-700 leading-relaxed min-h-[100px] resize-y"
                            placeholder="Texto do artigo..."
                        />
                    </div>
                ) : (
                    <p className={`text-gray-700 leading-relaxed ${artigo.revogado ? 'line-through text-gray-400' : ''}`}>
                        {artigo.texto}
                    </p>
                )}

                {/* Incisos */}
                {(artigo.incisos?.length > 0 || incisosEditados.length > 0 || editando) && (
                    <div className="mt-4 ml-4 space-y-3 border-t border-gray-100 pt-4">
                        {editando ? (
                            <SortableContext
                                items={incisosEditados.map((_, idx) => `inciso-${idx}`)}
                                strategy={verticalListSortingStrategy}
                            >
                                {incisosEditados.map((inciso, idx) => (
                                    <SortableItem key={`inc-edit-${idx}`} id={`inciso-${idx}`}>
                                        {(dragAttributes, dragListeners) => (
                                            <div className={`${inciso.revogado ? 'opacity-60' : ''} p-3 border border-gray-200 rounded-lg bg-gray-50`}>
                                                <div className="flex gap-2">
                                                    <span className="font-semibold text-brand-600 shrink-0">{inciso.numero} –</span>
                                                    <div className="flex-1">
                                                        <div className="space-y-2">
                                                            {/* Barra de ferramentas do inciso */}
                                                            <div className="flex gap-2 items-center">
                                                                {/* Handle de Drag */}
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
                                                                    onClick={() => aplicarNegrito(`inciso-${artigo.numero}-${idx}`, incisosEditados[idx]?.texto || '', (novoTexto) => handleIncisoChange(idx, 'texto', novoTexto))}
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
                                                                id={`inciso-${artigo.numero}-${idx}`}
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
                            // MODO VISUALIZAÇÃO (NÃO DRAGGABLE)
                            artigo.incisos?.map((inciso, idx) => (
                                <div key={idx} className={`${inciso.revogado ? 'opacity-60' : ''}`}>
                                    <div className="flex gap-2">
                                        <span className="font-semibold text-brand-600 shrink-0">{inciso.numero} –</span>
                                        <div className="flex-1">
                                            <span className={`text-gray-600 ${inciso.revogado ? 'line-through' : ''}`}>{inciso.texto}</span>
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
                )
                }

                {/* Parágrafos */}
                {
                    (artigo.paragrafos?.length > 0 || paragrafosEditados.length > 0 || editando) && (
                        <div className="mt-4 space-y-3">
                            {editando ? (
                                <SortableContext items={paragrafosEditados.map((_, idx) => `paragrafo-${idx}`)} strategy={verticalListSortingStrategy}>
                                    {paragrafosEditados.map((par, idx) => (
                                        <SortableItem key={`par-edit-${idx}`} id={`paragrafo-${idx}`}>
                                            {(dragAttributes, dragListeners) => (
                                                <div className={`${par.revogado ? 'opacity-60' : ''} p-3 border border-gray-200 rounded-lg bg-gray-50`}>
                                                    <div className="flex gap-2">
                                                        <span className="font-semibold text-gray-500 shrink-0">
                                                            {par.numero === 'único' ? 'Parágrafo único -' : `§ ${par.numero}`}
                                                        </span>
                                                        <div className="flex-1">
                                                            <div className="space-y-2">
                                                                {/* Barra de ferramentas do parágrafo */}
                                                                <div className="flex gap-2 items-center">
                                                                    {/* Handle */}
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
                                                                        onClick={() => aplicarNegrito(`paragrafo-${artigo.numero}-${idx}`, paragrafosEditados[idx]?.texto || '', (novoTexto) => handleParagrafoChange(idx, 'texto', novoTexto))}
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
                                                                    id={`paragrafo-${artigo.numero}-${idx}`}
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
                                artigo.paragrafos?.map((par, idx) => (
                                    <div key={idx} className={`${par.revogado ? 'opacity-60' : ''}`}>
                                        <div className="flex gap-2">
                                            <span className="font-semibold text-gray-500 shrink-0">
                                                {par.numero === 'único' ? 'Parágrafo único -' : `§ ${par.numero}`}
                                            </span>
                                            <div className="flex-1">
                                                <span className={`text-gray-600 ${par.revogado ? 'line-through' : ''}`}>{par.texto}</span>
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
                                                {par.revogado && <span className="artigo-badge revogado ml-2 text-[10px]">Revogado</span>}

                                                {/* Incisos dentro do Parágrafo */}
                                                {par.incisos && par.incisos.length > 0 && (
                                                    <div className="mt-2 ml-4 space-y-1">
                                                        {par.incisos.map((inciso, incisoIdx) => (
                                                            <div key={incisoIdx} className={`${inciso.revogado ? 'opacity-60' : ''}`}>
                                                                <div className="flex gap-2">
                                                                    <span className="font-semibold text-brand-600 shrink-0">{inciso.numero} –</span>
                                                                    <div className="flex-1">
                                                                        <span className={`text-gray-600 ${inciso.revogado ? 'line-through' : ''}`}>{inciso.texto}</span>
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
                                                                        {inciso.revogado && <span className="artigo-badge revogado ml-2 text-[10px]">Revogado</span>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
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
                    )
                }
            </DndContext >
        </div >
    )
}
