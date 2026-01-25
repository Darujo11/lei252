import { useState, useEffect } from 'react'
import { Cookie, X, Shield, ExternalLink } from 'lucide-react'

export default function BannerLGPD({ onAceitarPrivacidade }) {
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    // Verifica se o usuário já aceitou
    const aceitou = localStorage.getItem('lgpd_aceito')
    if (!aceitou) {
      // Aguarda 1 segundo antes de mostrar o banner (para não ser intrusivo)
      setTimeout(() => setMostrar(true), 1000)
    }
  }, [])

  const handleAceitar = () => {
    localStorage.setItem('lgpd_aceito', 'true')
    localStorage.setItem('lgpd_data_aceite', new Date().toISOString())
    setMostrar(false)
  }

  const handleRecusar = () => {
    // Se recusar, mostra um aviso de que algumas funcionalidades podem não funcionar
    const confirmar = window.confirm(
      'Ao recusar, algumas funcionalidades do portal podem não funcionar corretamente (como o ChatBot e estatísticas).\n\n' +
      'Você ainda poderá acessar todo o conteúdo da lei.\n\n' +
      'Deseja realmente recusar?'
    )

    if (confirmar) {
      localStorage.setItem('lgpd_aceito', 'false')
      setMostrar(false)
    }
  }

  if (!mostrar) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Banner */}
      <div className="relative max-w-6xl mx-auto m-4">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-blue-600 via-brand-600 to-purple-600 px-6 py-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Shield size={24} />
                <h3 className="font-bold text-lg">Privacidade e Cookies</h3>
              </div>
              <button
                onClick={() => setMostrar(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fechar temporariamente"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <Cookie className="text-brand-600 shrink-0 mt-1" size={32} />
              <div className="flex-1">
                <p className="text-gray-700 mb-3 leading-relaxed">
                  Este portal utiliza <strong>cookies e tecnologias similares</strong> para melhorar
                  sua experiência de navegação, analisar o uso do site e aprimorar nossos serviços.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Coletamos apenas <strong>dados anônimos</strong> de navegação e conversas com o ChatBot
                  para fins de análise e melhoria. <strong>Não coletamos dados pessoais identificáveis</strong>.
                </p>

                {/* Detalhes em lista */}
                <details className="mb-4 text-sm">
                  <summary className="cursor-pointer text-brand-600 font-semibold hover:text-brand-700 mb-2">
                    📋 O que coletamos?
                  </summary>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4 mt-2">
                    <li>Páginas visitadas e tempo de permanência</li>
                    <li>Tipo de navegador e dispositivo</li>
                    <li>Perguntas e respostas do ChatBot (anônimas)</li>
                    <li>Estatísticas de uso do portal</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                    ✓ Seus dados são armazenados de forma segura e <strong>não são compartilhados</strong> com
                    terceiros para fins comerciais.
                  </p>
                </details>

                {/* Link para política completa */}
                <button
                  onClick={() => {
                    onAceitarPrivacidade()
                    setMostrar(false)
                  }}
                  className="text-sm text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1 mb-4"
                >
                  Ler Política de Privacidade Completa
                  <ExternalLink size={14} />
                </button>

                {/* Botões de ação */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAceitar}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-600 to-blue-600 text-white font-semibold rounded-xl hover:from-brand-700 hover:to-blue-700 transition-all shadow-lg"
                  >
                    ✓ Aceitar e Continuar
                  </button>
                  <button
                    onClick={handleRecusar}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Recusar
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Ao continuar navegando, você concorda com nossa{' '}
                  <button
                    onClick={() => {
                      onAceitarPrivacidade()
                      setMostrar(false)
                    }}
                    className="text-brand-600 hover:underline"
                  >
                    Política de Privacidade
                  </button>
                  {' '}conforme a LGPD (Lei 13.709/2018).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
