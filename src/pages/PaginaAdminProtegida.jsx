import { useState, useEffect } from 'react'
import AdminLogin from '../components/AdminLogin'
import PaginaAdmin from './PaginaAdmin'

export default function PaginaAdminProtegida() {
  const [autenticado, setAutenticado] = useState(false)

  useEffect(() => {
    // Verifica se já está autenticado na sessão
    const isAuth = sessionStorage.getItem('admin_autenticado') === 'true'
    setAutenticado(isAuth)
  }, [])

  const handleLogin = () => {
    setAutenticado(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_autenticado')
    setAutenticado(false)
  }

  if (!autenticado) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div>
      {/* Botão de Logout no topo */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          🚪 Sair
        </button>
      </div>
      <PaginaAdmin />
    </div>
  )
}
