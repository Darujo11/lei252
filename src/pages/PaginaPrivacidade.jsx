import { Shield, Eye, Database, Lock, Mail, Calendar } from 'lucide-react'

export default function PaginaPrivacidade() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-brand-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} />
          <h1 className="text-3xl font-bold">Política de Privacidade</h1>
        </div>
        <p className="text-blue-100">
          Informações sobre coleta, uso e proteção de dados no Portal LC 252/2016
        </p>
        <p className="text-sm text-blue-200 mt-2">
          <Calendar size={14} className="inline mr-1" />
          Última atualização: Janeiro de 2026
        </p>
      </div>

      {/* Resumo Rápido */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <Eye size={20} />
          Resumo Rápido
        </h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Não coletamos dados pessoais identificáveis (nome, CPF, email)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Coletamos apenas dados de navegação anônimos para melhorar o portal</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Suas conversas com o ChatBot são armazenadas anonimamente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Você pode solicitar exclusão de dados a qualquer momento</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Seus dados não são compartilhados com terceiros</span>
          </li>
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="space-y-6">
        {/* 1. Introdução */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Database className="text-brand-600" size={24} />
            1. Introdução
          </h2>
          <div className="text-gray-700 space-y-3 text-sm leading-relaxed">
            <p>
              Este Portal foi desenvolvido pela <strong>Câmara Municipal de Macaé</strong> para
              facilitar o acesso à Lei Complementar 252/2016 e suas alterações.
            </p>
            <p>
              Esta Política de Privacidade explica quais informações coletamos, como as usamos
              e quais são seus direitos conforme a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
            </p>
            <p className="bg-gray-50 p-3 rounded-lg border-l-4 border-brand-500">
              <strong>Importante:</strong> Ao usar este portal, você concorda com a coleta e uso
              de informações conforme descrito nesta política.
            </p>
          </div>
        </div>

        {/* 2. Dados Coletados */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Database className="text-brand-600" size={24} />
            2. Quais Dados Coletamos
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">2.1. Dados de Navegação (Anônimos)</h3>
              <p className="text-sm text-gray-700 mb-2">
                Coletamos automaticamente informações sobre sua navegação para entender como o portal é usado:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Navegador e sistema operacional utilizados</li>
                <li>Resolução de tela do dispositivo</li>
                <li>Data e hora dos acessos</li>
                <li>Página de origem (referrer)</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                ℹ️ Esses dados são coletados através de um <strong>ID de sessão anônimo</strong> gerado
                automaticamente pelo seu navegador. Não é possível identificar você pessoalmente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">2.2. Conversas com o ChatBot</h3>
              <p className="text-sm text-gray-700 mb-2">
                Quando você usa o assistente virtual (ChatBot), armazenamos:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                <li>Perguntas que você faz ao ChatBot</li>
                <li>Respostas fornecidas pela inteligência artificial</li>
                <li>Data e hora da conversa</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                ℹ️ Essas conversas são armazenadas <strong>anonimamente</strong> para melhorar as respostas
                do ChatBot e identificar dúvidas frequentes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">2.3. Cookies</h3>
              <p className="text-sm text-gray-700 mb-2">
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                <li><strong>Session Storage:</strong> Armazena seu ID de sessão temporariamente</li>
                <li><strong>Local Storage:</strong> Salva sua preferência de aceite desta política</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                ℹ️ Você pode limpar os cookies a qualquer momento nas configurações do navegador.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Shield size={16} />
                O que NÃO coletamos
              </h3>
              <ul className="list-disc list-inside text-sm text-green-700 space-y-1 ml-4">
                <li>Nome, CPF, RG ou outros documentos pessoais</li>
                <li>Endereço de email ou telefone</li>
                <li>Endereço residencial</li>
                <li>Dados bancários ou financeiros</li>
                <li>Qualquer informação que possa identificá-lo diretamente</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Como Usamos os Dados */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Eye className="text-brand-600" size={24} />
            3. Como Usamos os Dados
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Os dados coletados são utilizados exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Melhorar o portal:</strong> Identificar páginas mais acessadas e problemas de navegação</li>
              <li><strong>Aprimorar o ChatBot:</strong> Entender dúvidas frequentes e melhorar as respostas</li>
              <li><strong>Gerar estatísticas:</strong> Relatórios internos sobre uso do portal</li>
              <li><strong>Garantir segurança:</strong> Detectar e prevenir abusos ou uso indevido</li>
            </ul>
            <p className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mt-3">
              <strong>⚠️ Importante:</strong> Seus dados NÃO são usados para marketing, publicidade
              ou qualquer outro fim comercial.
            </p>
          </div>
        </div>

        {/* 4. Compartilhamento */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Lock className="text-brand-600" size={24} />
            4. Compartilhamento de Dados
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="font-semibold">Seus dados NÃO são compartilhados com terceiros, exceto:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Supabase (armazenamento):</strong> Banco de dados em nuvem utilizado para
                armazenar dados de analytics. Supabase possui certificações de segurança e está em
                conformidade com GDPR/LGPD.
              </li>
              <li>
                <strong>OpenAI (ChatBot):</strong> Suas perguntas são enviadas à API da OpenAI para
                gerar respostas. OpenAI não armazena conversas permanentemente quando configurado corretamente.
              </li>
            </ul>
            <p className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mt-3">
              <strong>🔒 Segurança:</strong> Todos os dados são transmitidos de forma criptografada (HTTPS).
            </p>
          </div>
        </div>

        {/* 5. Seus Direitos */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Shield className="text-brand-600" size={24} />
            5. Seus Direitos (LGPD)
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Conforme a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), você tem direito a:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-1">✓ Confirmação e Acesso</h4>
                <p className="text-xs text-gray-600">Saber se coletamos dados seus e acessá-los</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-1">✓ Correção</h4>
                <p className="text-xs text-gray-600">Solicitar correção de dados incompletos ou incorretos</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-1">✓ Anonimização ou Exclusão</h4>
                <p className="text-xs text-gray-600">Pedir anonimização ou remoção de dados desnecessários</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-1">✓ Portabilidade</h4>
                <p className="text-xs text-gray-600">Solicitar seus dados em formato estruturado</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-1">✓ Revogação do Consentimento</h4>
                <p className="text-xs text-gray-600">Retirar seu consentimento a qualquer momento</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-1">✓ Informação sobre Compartilhamento</h4>
                <p className="text-xs text-gray-600">Saber com quem seus dados são compartilhados</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Retenção de Dados */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar className="text-brand-600" size={24} />
            6. Retenção de Dados
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Os dados são mantidos pelos seguintes períodos:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Dados de navegação:</strong> Armazenados por até 2 anos para análises históricas</li>
              <li><strong>Conversas do ChatBot:</strong> Mantidas indefinidamente para treinamento e melhoria</li>
              <li><strong>Cookies/Session Storage:</strong> Válidos apenas durante a sessão ou até serem limpos</li>
            </ul>
            <p className="bg-gray-50 p-3 rounded mt-3">
              Você pode solicitar a exclusão antecipada de seus dados a qualquer momento.
            </p>
          </div>
        </div>

        {/* 7. Segurança */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Lock className="text-brand-600" size={24} />
            7. Segurança dos Dados
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Criptografia HTTPS em todas as comunicações</li>
              <li>Banco de dados com políticas de segurança em nível de linha (RLS)</li>
              <li>Acesso restrito ao painel administrativo (protegido por senha)</li>
              <li>Monitoramento de acessos suspeitos</li>
            </ul>
          </div>
        </div>

        {/* 8. Alterações */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-3">8. Alterações nesta Política</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você
              a revise regularmente. Alterações significativas serão comunicadas através de aviso no portal.
            </p>
            <p className="text-xs text-gray-500">
              Última atualização: Janeiro de 2026
            </p>
          </div>
        </div>

        {/* 9. Contato */}
        <div className="bg-gradient-to-r from-brand-600 to-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Mail size={24} />
            9. Contato - DPO (Encarregado de Dados)
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-3">
              <p><strong>Câmara Municipal de Macaé</strong></p>
              <p>Setor de Tecnologia da Informação</p>
              <p className="mt-2">
                📧 Email: <a href="mailto:dpo@cmmacae.rj.gov.br" className="underline">dpo@cmmacae.rj.gov.br</a>
              </p>
              <p>📞 Telefone: (22) 2141-XXXX</p>
              <p className="text-xs mt-2 text-blue-100">
                Responderemos sua solicitação em até 15 dias úteis, conforme determina a LGPD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
