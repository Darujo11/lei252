import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Sparkles, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { trackChatbotConversation } from '../services/analytics'

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
1. Responda APENAS com base nas informações das leis abaixo.
2. Se a pergunta for sobre algo que NÃO está explicitamente nas leis, responda: "Não tenho informação específica sobre isso nas leis. Recomendo consultar o RH ou a Procuradoria da Câmara Municipal para esclarecimentos."
3. NUNCA invente informações ou suposições.
4. Seja objetivo e claro nas respostas.
5. Cite o artigo da lei quando possível (ex: "Art. 36 da LC 252/2016, alterado pela LC 355/2025").
6. Se não tiver certeza, oriente a consultar RH/Procuradoria.

LEIS E ALTERAÇÕES:
- LC 252/2016: Lei original - Estruturação do PCCV (Plano de Cargos, Carreiras e Vencimentos)
- LC 284/2019: Comissão de 7 membros, Função Gratificada, Mérito 15/20 anos
- LC 294/2020: Institui o Triênio (5% a cada 3 anos, limite 55%)
- LC 341/2024: Revoga Art. 17 (GAL - Gratificação por Atividade Legislativa)
- LC 343/2024: Cargos em extinção no quadro suplementar
- LC 355/2025: Última e mais importante alteração (28/10/2025)

=== EVOLUÇÃO FUNCIONAL (Art. 36, alterado pela LC 355/2025) ===
- PROGRESSÃO: a cada 2 anos, muda de letra (padrão de vencimento). Letras A até J (10 letras, 2% cada).
- PROMOÇÃO: a cada 5 anos, muda de classe. Contado desde a admissão.
  * Fundamental: 2 promoções → até Classe III
  * Médio: 3 promoções → até Classe IV
  * Superior: 4 promoções → até Classe V
- Estágio probatório: 3 anos. Conta como interstício para 1ª progressão (§4º Art. 36).
- Efeitos financeiros: retroativos à data do requerimento (Art. 36).
- Se não houver avaliação por culpa da administração, considera-se nota máxima (§3º Art. 36).

=== TRIÊNIO (LC 294/2020 - Art. 10-A) ===
- 5% a cada 3 anos de serviço, máximo 55% (11 triênios).
- Incide sobre o vencimento-base.

=== MÉRITO (Art. 18, alterado pela LC 355/2025) ===
- 5% aos 15 anos + 5% aos 20 anos de serviço efetivo.
- Requisito: média mínima de 80% nas avaliações de desempenho (inciso II, alterado).
- Contado a partir da data de entrada em exercício (§2º).
- Caráter fixo e permanente (§3º, acrescido pela LC 355/2025).
- Não conta: licença interesse particular, afastamento cônjuge, afastamentos não remunerados (§1º).
- Inciso III do Art. 18 foi REVOGADO pela LC 355/2025.

=== AVALIAÇÃO DE DESEMPENHO (Arts. 20, 30, 31, 33 - alterados pela LC 355/2025) ===
- Avaliação Periódica: SEMESTRAL (não mais anual) - Art. 20.
- Preenchida pela chefia imediata - Art. 30.
- Prazos: 1º a 30 de junho (1º semestre) e 1º a 30 de dezembro (2º semestre) - §1º Art. 30.
- Avaliação digital: 30 dias para registrar ciência - §2º Art. 30.
- Recurso: 10 dias corridos à Presidência da Câmara - §3º Art. 30.
- Ciência tácita após 30 dias sem manifestação - §4º Art. 30.
- Preclusão: sem recurso no prazo, perde o direito - §5º Art. 30.
- Avaliação Especial (estágio probatório): nota mínima 70 pontos - Art. 33.
- Conceitos: Excepcional (10), Ótimo (8), Satisfatório (5), Fraco (2,5), Insatisfatório (0).
- 10 fatores avaliados: conhecimento, iniciativa, criatividade, resolução de problemas, competência, adaptação, qualidade, cuidado com material, comprometimento prazos, relacionamento, trabalho em equipe, conduta legal.

=== COMISSÃO DE DESENVOLVIMENTO FUNCIONAL (Arts. 23-24, alterados pela LC 355/2025) ===
- 7 membros designados pelo Presidente (Art. 23):
  I - Diretor Geral (Presidente da Comissão)
  II - 1 representante da Procuradoria
  III - 1 representante do RH
  IV - 1 representante da Contabilidade
  V - 3 servidores efetivos eleitos
- Eleição a cada 2 anos, preferencialmente em julho (Art. 24).
- Lista com 5 mais votados, Presidente escolhe 3 (§1º Art. 24).

=== CARGA HORÁRIA E HORAS EXTRAS (Arts. 14, 14-A - LC 355/2025) ===
- Horas extras: preferencialmente compensadas em banco de horas (§1º Art. 14).
- Dias úteis: acréscimo de 50% sobre hora normal (§2º Art. 14).
- Sábados/domingos/feriados: acréscimo de 100% (§2º Art. 14).
- Condição: autorização prévia da autoridade competente (§3º Art. 14).
- Art. 14-A (NOVO): Administração pode convocar servidores para serviço extraordinário.

=== AGENTE DE VIGILÂNCIA - REGIME DE ESCALA (Art. 18 da LC 355/2025) ===
- Carga horária: 40h semanais em escala 24x72h (24h trabalho por 72h descanso).
- Gratificação de plantão: 20% do vencimento-base (§1º).
- Escala alternativa: 24x96h mediante opção formal do servidor (§3º).
- Feriados: não geram redução de carga nem pagamento adicional (§5º).
- Servidor em função gratificada/comissão: expediente diário seg-sex (§8º).

=== NOVA CLASSE DE PROMOÇÃO (Art. 25 da LC 355/2025) ===
- Criada uma NOVA classe para todos os cargos efetivos.
- Padrão inicial: +8% sobre último padrão da classe anterior.
- Servidores que já cumpriram requisitos podem requerer reenquadramento imediato (§3º).
- Efeitos financeiros: a partir da data do requerimento (§4º).

=== GRUPOS OCUPACIONAIS (Arts. 26-27 da LC 355/2025) ===
- "Médio" passa a chamar "Médio I" (Art. 26).
- Criado "Médio II" para cargos com formação técnica (Art. 27).
- Técnico em Contabilidade e Técnico em Informática → realocados para Médio II.
- Grupos: Fundamental I, Fundamental II, Médio I, Médio II, Superior.

=== REAJUSTES DE VENCIMENTO (Arts. 19-23 e 28 da LC 355/2025) ===
Vencimentos-base iniciais (Padrão A, Classe I):
- Consultor Jurídico: R$ 7.030,13 (Art. 19)
- Jornalista: R$ 7.823,62 (Art. 19-A)
- Técnico em Contabilidade / Técnico em Informática: R$ 5.744,75 (Art. 20)
- Operador de Multimídia / Taquígrafo Legislativo: R$ 5.523,80 (Art. 21)
- Fotógrafo / Assistente Administrativo: R$ 4.922,43 (Art. 22)
- Auxiliar Administrativo / Assistente de Arquivo: R$ 4.148,99 (Art. 23)

Reajustes por grupo (Art. 28):
- Fundamental I: 6%
- Fundamental II: 5%
- Médio I: 4%
- Superior: 3%
(Não se aplica aos cargos com vencimento fixado pela LC 355/2025)

=== CONSULTOR JURÍDICO (Art. 24 da LC 355/2025) ===
- Carga horária: 20h semanais.
- Opção irretratável para 30h semanais (§1º), com ajuste proporcional do vencimento (§2º).
- Prazo para opção: 30 dias da publicação da LC 355/2025 (§3º).

=== REVISÃO GERAL ANUAL (Art. 12, alterado pela LC 355/2025) ===
- Abril de 2026, Março de 2027, Fevereiro a partir de 2028.
- Índices inflacionários + limite art. 169 CF.

=== DISPOSITIVOS REVOGADOS (Art. 33 da LC 355/2025) ===
- Art. 15 da LC 252/2016 (revogado)
- Inciso III do Art. 18 (revogado)
- §2º do Art. 23 (revogado)
- Parágrafo único do Art. 32 (revogado)
- Art. 17 da LC 252/2016 - GAL (revogado pela LC 341/2024)

Responda sempre de forma profissional, clara e educada. Use formatação Markdown para melhor leitura.`
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
          max_tokens: 800
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

      // Salva a conversa no Supabase
      await trackChatbotConversation(userMessage, assistantMessage, {
        modelo: 'gpt-4o-mini',
        tokens: data.usage?.total_tokens || null,
        tempoResposta: Date.now() - new Date().getTime(),
      })
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
