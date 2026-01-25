import { useState } from 'react'
import { Lock, Eye, EyeOff, Shield } from 'lucide-react'

export default function AdminLogin({ onLogin }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  // Senha padrão (você pode mudar isso)
  const SENHA_ADMIN = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (senha === SENHA_ADMIN) {
      sessionStorage.setItem('admin_autenticado', 'true')
      onLogin()
      setErro(false)
    } else {
      setErro(true)
      setSenha('')
    }
  }

  return (
    <div className="min-h-[600px] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-brand-600 rounded-full mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Painel Administrativo
            </h2>
            <p className="text-gray-600 text-sm">
              Acesso restrito - Digite a senha
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value)
                    setErro(false)
                  }}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
                    erro
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-brand-500'
                  }`}
                  placeholder="Digite a senha..."
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {erro && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  ❌ Senha incorreta. Tente novamente.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 via-brand-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Acessar Painel
            </button>
          </form>

          {/* Informações */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-amber-800">
              <strong>💡 Dica:</strong> Configure a senha do admin no arquivo{' '}
              <code className="bg-white px-1.5 py-0.5 rounded">.env</code> usando a variável{' '}
              <code className="bg-white px-1.5 py-0.5 rounded">VITE_ADMIN_PASSWORD</code>
            </p>
            <p className="text-xs text-amber-700 mt-2">
              Senha padrão (se não configurada): <code className="bg-white px-1.5 py-0.5 rounded font-semibold">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
