import { useState } from 'react'
import { Calculator, Calendar, Award, TrendingUp } from 'lucide-react'

export default function PaginaCalculadora() {
  const [dataAdmissao, setDataAdmissao] = useState('')
  const [resultado, setResultado] = useState(null)

  const calcular = () => {
    if (!dataAdmissao) return
    
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
    const anosAposEstagio = Math.max(0, anos - 3)
    const progressoesPossiveis = Math.floor(anosAposEstagio / 2)
    
    // Promoções (Art. 41 - a cada 5 anos após estágio probatório)
    const promocoesPossiveis = Math.floor(anosAposEstagio / 5)
    
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
      promocoesPossiveis,
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
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Data de Admissão</label>
            <input
              type="date"
              value={dataAdmissao}
              onChange={(e) => setDataAdmissao(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={calcular}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-brand-800 transition-all shadow-lg shadow-brand-500/25"
            >
              Calcular
            </button>
          </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-700">{resultado.progressoesPossiveis}</p>
                <p className="text-sm text-gray-500">Progressões possíveis</p>
                <p className="text-xs text-gray-400 mt-1">Art. 38 - A cada 2 anos</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <p className="text-2xl font-bold text-orange-700">{resultado.promocoesPossiveis}</p>
                <p className="text-sm text-gray-500">Promoções possíveis</p>
                <p className="text-xs text-gray-400 mt-1">Art. 41 - A cada 5 anos</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">* Contados após 3 anos de estágio probatório. Requer média mínima de 70% nas avaliações.</p>
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
          <p className="text-gray-400">Informe a data de admissão para calcular</p>
        </div>
      )}
    </div>
  )
}
