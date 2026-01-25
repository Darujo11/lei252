import { useState } from 'react'
import { Calculator, Calendar, Award, TrendingUp } from 'lucide-react'

export default function PaginaCalculadora() {
  const [dataAdmissao, setDataAdmissao] = useState('')
  const [escolaridade, setEscolaridade] = useState('')
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    if (!dataAdmissao || !escolaridade) return

    const admissao = new Date(dataAdmissao)
    const hoje = new Date()
    const diffMs = hoje - admissao
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const anos = Math.floor(diffDias / 365)
    const diasRestantes = diffDias % 365

    // Triênios (Art. 10-A LC 294/2020)
    const trieniosCompletos = Math.min(Math.floor(anos / 3), 11) // máx 11 triênios = 55%
    const percentualTrienio = trieniosCompletos * 5
    const proximoTrienio = new Date(admissao)
    proximoTrienio.setFullYear(proximoTrienio.getFullYear() + (trieniosCompletos + 1) * 3)
    const diasParaProximoTrienio = Math.max(0, Math.ceil((proximoTrienio - hoje) / (1000 * 60 * 60 * 24)))

    // Mérito (Art. 18 LC 284/2019)
    const merito15 = anos >= 15
    const merito20 = anos >= 20
    const percentualMerito = (merito15 ? 5 : 0) + (merito20 ? 5 : 0)

    // Progressões (Art. 38 - a cada 2 anos após estágio probatório)
    // Progressões vão de A a J (10 letras, cada uma 2%)
    const anosAposEstagio = Math.max(0, anos - 3)
    const progressoesPossiveis = Math.min(Math.floor(anosAposEstagio / 2), 10) // Máximo J (10 progressões)
    const letrasProgressao = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const letraAtual = progressoesPossiveis > 0 ? letrasProgressao[progressoesPossiveis - 1] : '-'
    const percentualProgressao = progressoesPossiveis * 2 // Cada letra vale 2%

    // Promoções (Art. 41 - a cada 5 anos)
    // Limite baseado na escolaridade
    const limitePromocoes = {
      'fundamental': 2,
      'medio': 3,
      'superior': 4
    }
    const maxPromocoes = limitePromocoes[escolaridade]
    const promocoesPossiveis = Math.floor(anos / 5) // Contadas a cada 5 anos desde a admissão
    const promocoesDisponiveis = Math.min(promocoesPossiveis, maxPromocoes)
    const promocoesRestantes = Math.max(0, maxPromocoes - promocoesPossiveis)

    setResultado({
      anos,
      diasRestantes,
      diffDias,
      trieniosCompletos,
      percentualTrienio,
      proximoTrienio: proximoTrienio.toLocaleDateString('pt-BR'),
      diasParaProximoTrienio,
      merito15,
      merito20,
      percentualMerito,
      progressoesPossiveis,
      letraAtual,
      percentualProgressao,
      promocoesPossiveis,
      promocoesDisponiveis,
      maxPromocoes,
      promocoesRestantes,
      escolaridadeTexto: escolaridade === 'fundamental' ? 'Fundamental' : escolaridade === 'medio' ? 'Médio' : 'Superior',
      percentualTotal: percentualTrienio + percentualMerito
    })
  }

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Calculator className="text-brand-600" /> Calculadora de Benefícios
        </h1>
        <p className="text-gray-500 mb-6">Calcule triênios, adicional de mérito, progressões e promoções</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data de Admissão</label>
            <input
              type="date"
              value={dataAdmissao}
              onChange={(e) => setDataAdmissao(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Escolaridade do Cargo</label>
            <select
              value={escolaridade}
              onChange={(e) => setEscolaridade(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:outline-none bg-white"
            >
              <option value="">Selecione...</option>
              <option value="fundamental">Fundamental (até 2 promoções - Classe III)</option>
              <option value="medio">Médio (até 3 promoções - Classe IV)</option>
              <option value="superior">Superior (até 4 promoções - Classe V)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={calcular}
            disabled={!dataAdmissao || !escolaridade}
            className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calcular
          </button>
        </div>
      </div>

      {resultado && (
        <div className="space-y-4 animate-fade-in">
          {/* Tempo de Serviço */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-brand-600" />
              <h3 className="font-bold text-gray-800">Tempo de Serviço</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-brand-50 rounded-xl">
                <p className="text-3xl font-bold text-brand-700">{resultado.anos}</p>
                <p className="text-sm text-gray-500">anos</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-700">{resultado.diffDias}</p>
                <p className="text-sm text-gray-500">dias totais</p>
              </div>
            </div>
          </div>

          {/* Triênio */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-cyan-600" />
              <h3 className="font-bold text-gray-800">Triênio (Art. 10-A - LC 294/2020)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-cyan-50 rounded-xl">
                <p className="text-3xl font-bold text-cyan-700">{resultado.trieniosCompletos}</p>
                <p className="text-sm text-gray-500">triênios</p>
              </div>
              <div className="text-center p-4 bg-cyan-50 rounded-xl">
                <p className="text-3xl font-bold text-cyan-700">{resultado.percentualTrienio}%</p>
                <p className="text-sm text-gray-500">adicional</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl col-span-2">
                <p className="text-lg font-semibold text-gray-700">{resultado.proximoTrienio}</p>
                <p className="text-sm text-gray-500">próximo triênio ({resultado.diasParaProximoTrienio} dias)</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Limite máximo: 55% (11 triênios)</p>
          </div>

          {/* Mérito */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-purple-600" />
              <h3 className="font-bold text-gray-800">Adicional de Mérito (Art. 18 - LC 284/2019)</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className={`text-center p-4 rounded-xl ${resultado.merito15 ? 'bg-green-50' : 'bg-gray-100'}`}>
                <p className={`text-2xl font-bold ${resultado.merito15 ? 'text-green-700' : 'text-gray-400'}`}>
                  {resultado.merito15 ? '✓ 5%' : '5%'}
                </p>
                <p className="text-sm text-gray-500">15 anos</p>
              </div>
              <div className={`text-center p-4 rounded-xl ${resultado.merito20 ? 'bg-green-50' : 'bg-gray-100'}`}>
                <p className={`text-2xl font-bold ${resultado.merito20 ? 'text-green-700' : 'text-gray-400'}`}>
                  {resultado.merito20 ? '✓ 5%' : '5%'}
                </p>
                <p className="text-sm text-gray-500">20 anos</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-700">{resultado.percentualMerito}%</p>
                <p className="text-sm text-gray-500">total mérito</p>
              </div>
            </div>
          </div>

          {/* Evolução Funcional */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-green-600" />
              <h3 className="font-bold text-gray-800">Evolução Funcional</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-2xl font-bold text-blue-700">Letra {resultado.letraAtual}</p>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold">
                    {resultado.progressoesPossiveis}/10
                  </span>
                </div>
                <p className="text-sm text-gray-500">Progressão atual</p>
                <p className="text-xs text-gray-400 mt-1">Art. 38 - A cada 2 anos</p>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">A → J:</span> 10 letras (cada uma 2%)
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Percentual de progressão: {resultado.percentualProgressao}%
                  </p>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-2xl font-bold text-orange-700">Classe {resultado.promocoesDisponiveis + 1}</p>
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-semibold">
                    {resultado.promocoesDisponiveis} promoções
                  </span>
                </div>
                <p className="text-sm text-gray-500">Classe atual</p>
                <p className="text-xs text-gray-400 mt-1">Art. 41 - A cada 5 anos</p>
                <div className="mt-3 pt-3 border-t border-orange-200">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Nível {resultado.escolaridadeTexto}:</span> Máx. {resultado.maxPromocoes} promoções (Classe {resultado.maxPromocoes + 1})
                  </p>
                  {resultado.promocoesDisponiveis < resultado.maxPromocoes && (
                    <p className="text-xs text-orange-600 mt-1">
                      Faltam {resultado.promocoesRestantes} promoção(ões) para o limite
                    </p>
                  )}
                  {resultado.promocoesDisponiveis >= resultado.maxPromocoes && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Limite máximo de promoções atingido
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-2">
                <span className="font-semibold">Como funciona:</span>
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>Progressões (A-J):</strong> A cada 2 anos após estágio probatório, você avança uma letra (2% cada). Máximo: Letra J.</li>
                <li>• <strong>Promoções (Classes):</strong> Você começa na Classe I. A cada 5 anos, recebe uma promoção e sobe de classe (Classe II, III, IV...). As letras reiniciam de A ao mudar de classe.</li>
                <li>• Ambas requerem média mínima de 70% nas avaliações de desempenho.</li>
              </ul>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Resumo dos Adicionais</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Triênio + Mérito</p>
                <p className="text-xs text-blue-200">(Sobre o vencimento base)</p>
              </div>
              <p className="text-4xl font-bold">{resultado.percentualTotal}%</p>
            </div>
          </div>
        </div>
      )}

      {!resultado && (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <Calculator className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-400">Informe a data de admissão e o nível de escolaridade para calcular</p>
        </div>
      )}
    </div>
  )
}
