import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Sparkles, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Olá! Sou uma **Inteligência Artificial** especializada na **Lei Complementar 252/2016** e suas alterações.\n\nPosso ajudar com dúvidas sobre:\n- Triênios e Mérito\n- Progressões e Promoções\n- Cargos e Vencimentos\n- E muito mais!\n\n💬 Como posso ajudar você hoje?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY

      if (!apiKey) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Erro: Chave da API não configurada. Por favor, configure a variável VITE_OPENAI_API_KEY no arquivo .env'
        }])
        setIsLoading(false)
        return
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Você é um assistente virtual especializado na Lei Complementar 252/2016 e suas alterações da Câmara Municipal de Macaé.

INSTRUÇÕES IMPORTANTES:
1. Responda APENAS com base nas informações das leis que você conhece sobre a LC 252/2016 e suas alterações (LC 284/2019, LC 294/2020, LC 341/2024, LC 343/2024, LC 355/2025)
2. Se a pergunta for sobre algo que NÃO está explicitamente nas leis, responda: "Não tenho informação específica sobre isso nas leis. Recomendo consultar o RH ou a Procuradoria da Câmara Municipal para esclarecimentos."
3. NUNCA invente informações ou suposições
4. Seja objetivo e claro nas respostas
5. Cite o artigo da lei quando possível
6. Se não tiver certeza, peça esclarecimentos ou oriente a consultar RH/Procuradoria

CONTEXTO DAS LEIS:
- LC 252/2016: Estrutura do PCCV, cargos, vencimentos, progressões, promoções
- LC 284/2019: Comissão de 7 membros, Função Gratificada, Mérito 15/20 anos
- LC 294/2020: Triênio (5% a cada 3 anos, limite 55%)
- LC 341/2024: Revoga Art. 17 (GAL)
- LC 343/2024: Cargos em extinção
- LC 355/2025: Grupos ocupacionais, avaliação de desempenho

INFORMAÇÕES ESPECÍFICAS:
- Progressões: A cada 2 anos após estágio probatório, de A até J (10 letras, 2% cada)
- Promoções: A cada 5 anos, muda de classe. Limite por escolaridade:
  * Fundamental: 2 promoções (Classe I até III)
  * Médio: 3 promoções (Classe I até IV)
  * Superior: 4 promoções (Classe I até V)
- Triênio: 5% a cada 3 anos, máximo 55% (11 triênios)
- Mérito: 5% aos 15 anos + 5% aos 20 anos de serviço
- Estágio probatório: 3 anos
- Avaliações: média mínima de 70% para progressões/promoções

Responda sempre de forma profissional, clara e educada.`
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro da API OpenAI:', errorData)

        let errorMessage = 'Erro ao comunicar com a API'
        if (response.status === 401) {
          errorMessage = 'Chave da API inválida. Verifique se a chave está correta no arquivo .env'
        } else if (response.status === 429) {
          errorMessage = 'Limite de requisições excedido. Tente novamente em alguns instantes.'
        } else if (errorData.error?.message) {
          errorMessage = errorData.error.message
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      const assistantMessage = data.choices[0].message.content

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage
      }])
    } catch (error) {
      console.error('Erro completo:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ ${error.message || 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.'}`
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-brand-600 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center animate-bounce-slow hover:animate-none"
            aria-label="Abrir assistente IA"
          >
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

            {/* Anel pulsante */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-300 animate-ping opacity-30"></div>

            {/* Ícone */}
            <div className="relative z-10 flex items-center justify-center">
              <Bot size={32} className="animate-pulse-slow" />
              <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-spin-slow" />
            </div>

            {/* Badge IA */}
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
              IA
            </span>
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
              💬 Assistente IA - Tire suas dúvidas sobre a LC 252/2016
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-brand-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot size={28} />
                <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">Assistente IA</h3>
                  <span className="bg-white/20 text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                    LC 252/2016
                  </span>
                </div>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online • Tire suas dúvidas sobre a lei
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    message.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                          li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                          code: ({node, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono" {...props} />,
                          h3: ({node, ...props}) => <h3 className="font-bold text-base mb-1 mt-2" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl rounded-bl-none shadow-sm border border-gray-100">
                  <Loader2 className="animate-spin text-brand-600" size={20} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-brand-500 focus:outline-none text-sm disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensagem"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
              <Sparkles size={12} className="text-purple-400" />
              Assistente IA • Consulte RH para casos específicos
            </p>
          </div>
        </div>
      )}
    </>
  )
}
