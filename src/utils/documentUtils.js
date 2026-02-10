// Utilitários para manipulação de documentos da lei

/**
 * Exporta a lei completa como JSON estruturado
 * @param {Array} capitulos - Array de capítulos da lei
 * @returns {string} - JSON formatado
 */
export function exportLeiAsJSON(capitulos) {
  const exportData = {
    versao: '1.0',
    exportadoEm: new Date().toISOString(),
    lei: 'LC 252/2016 Consolidada',
    capitulos: capitulos
  }
  return JSON.stringify(exportData, null, 2)
}

/**
 * Exporta a lei como TXT formatado para leitura humana
 * @param {Array} capitulos - Array de capítulos da lei
 * @returns {string} - Texto formatado
 */
export function exportLeiAsTXT(capitulos) {
  let txt = '=' .repeat(80) + '\n'
  txt += 'LEI COMPLEMENTAR Nº 252/2016 - CONSOLIDADA\n'
  txt += 'Plano de Cargos, Carreiras e Vencimentos - CMM\n'
  txt += '=' .repeat(80) + '\n\n'

  capitulos.forEach(capitulo => {
    txt += `\nCAPÍTULO ${capitulo.numero} - ${capitulo.titulo.toUpperCase()}\n`
    txt += '-'.repeat(60) + '\n\n'

    capitulo.secoes?.forEach(secao => {
      txt += `\n  SEÇÃO: ${secao.titulo}\n\n`

      secao.artigos?.forEach(artigo => {
        const fonte = artigo.fonte ? ` [${artigo.fonte.toUpperCase()}]` : ''
        const status = artigo.revogado ? ' (REVOGADO)' : artigo.alterado ? ' (ALTERADO)' : artigo.acrescido ? ' (ACRESCIDO)' : ''
        
        txt += `    Art. ${artigo.numero}${status}${fonte}\n`
        txt += `    ${artigo.texto}\n`

        // Incisos
        artigo.incisos?.forEach(inciso => {
          const incisoStatus = inciso.revogado ? ' (REVOGADO)' : inciso.alterado ? ' (ALTERADO)' : inciso.acrescido ? ' (ACRESCIDO)' : ''
          txt += `      ${inciso.numero} - ${inciso.texto}${incisoStatus}\n`
        })

        // Parágrafos
        artigo.paragrafos?.forEach(paragrafo => {
          const pStatus = paragrafo.revogado ? ' (REVOGADO)' : paragrafo.alterado ? ' (ALTERADO)' : paragrafo.acrescido ? ' (ACRESCIDO)' : ''
          txt += `      § ${paragrafo.numero} - ${paragrafo.texto}${pStatus}\n`
        })

        txt += '\n'
      })
    })
  })

  return txt
}

/**
 * Faz parse de um arquivo JSON da lei
 * @param {string} jsonContent - Conteúdo JSON
 * @returns {Object} - Objeto com dados da lei ou erro
 */
export function parseLeiJSON(jsonContent) {
  try {
    const data = JSON.parse(jsonContent)
    
    // Validar estrutura básica
    if (!data.capitulos || !Array.isArray(data.capitulos)) {
      return { success: false, error: 'Estrutura inválida: campo "capitulos" não encontrado ou não é um array' }
    }

    // Validar cada capítulo
    for (const cap of data.capitulos) {
      if (!cap.id || !cap.numero || !cap.titulo) {
        return { success: false, error: `Capítulo inválido: faltam campos obrigatórios (id, numero, titulo)` }
      }
    }

    return { success: true, data: data.capitulos, metadata: { versao: data.versao, exportadoEm: data.exportadoEm } }
  } catch (e) {
    return { success: false, error: `Erro ao fazer parse do JSON: ${e.message}` }
  }
}

/**
 * Compara duas versões da lei e retorna as diferenças
 * @param {Array} original - Capítulos originais
 * @param {Array} modified - Capítulos modificados
 * @returns {Array} - Lista de alterações detectadas
 */
export function diffLeiVersions(original, modified) {
  const changes = []

  const findArtigo = (caps, capId, secId, artNum) => {
    const cap = caps.find(c => c.id === capId)
    if (!cap) return null
    const sec = cap.secoes?.find(s => s.id === secId)
    if (!sec) return null
    return sec.artigos?.find(a => String(a.numero) === String(artNum))
  }

  // Percorrer todos os artigos modificados
  modified.forEach(cap => {
    cap.secoes?.forEach(sec => {
      sec.artigos?.forEach(artMod => {
        const artOrig = findArtigo(original, cap.id, sec.id, artMod.numero)
        
        if (!artOrig) {
          changes.push({
            tipo: 'novo',
            capitulo: cap.titulo,
            secao: sec.titulo,
            artigo: artMod.numero,
            campo: 'artigo',
            valorAnterior: null,
            valorNovo: artMod.texto
          })
        } else if (artOrig.texto !== artMod.texto) {
          changes.push({
            tipo: 'alterado',
            capitulo: cap.titulo,
            secao: sec.titulo,
            artigo: artMod.numero,
            campo: 'texto',
            valorAnterior: artOrig.texto,
            valorNovo: artMod.texto
          })
        }

        // Comparar incisos
        artMod.incisos?.forEach(incMod => {
          const incOrig = artOrig?.incisos?.find(i => i.numero === incMod.numero)
          if (!incOrig) {
            changes.push({
              tipo: 'novo',
              capitulo: cap.titulo,
              secao: sec.titulo,
              artigo: artMod.numero,
              campo: `inciso ${incMod.numero}`,
              valorAnterior: null,
              valorNovo: incMod.texto
            })
          } else if (incOrig.texto !== incMod.texto) {
            changes.push({
              tipo: 'alterado',
              capitulo: cap.titulo,
              secao: sec.titulo,
              artigo: artMod.numero,
              campo: `inciso ${incMod.numero}`,
              valorAnterior: incOrig.texto,
              valorNovo: incMod.texto
            })
          }
        })

        // Comparar parágrafos
        artMod.paragrafos?.forEach(parMod => {
          const parOrig = artOrig?.paragrafos?.find(p => p.numero === parMod.numero)
          if (!parOrig) {
            changes.push({
              tipo: 'novo',
              capitulo: cap.titulo,
              secao: sec.titulo,
              artigo: artMod.numero,
              campo: `§ ${parMod.numero}`,
              valorAnterior: null,
              valorNovo: parMod.texto
            })
          } else if (parOrig.texto !== parMod.texto) {
            changes.push({
              tipo: 'alterado',
              capitulo: cap.titulo,
              secao: sec.titulo,
              artigo: artMod.numero,
              campo: `§ ${parMod.numero}`,
              valorAnterior: parOrig.texto,
              valorNovo: parMod.texto
            })
          }
        })
      })
    })
  })

  return changes
}

/**
 * Baixa um arquivo no navegador
 * @param {string} content - Conteúdo do arquivo
 * @param {string} filename - Nome do arquivo
 * @param {string} mimeType - Tipo MIME
 */
export function downloadFile(content, filename, mimeType = 'application/json') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
