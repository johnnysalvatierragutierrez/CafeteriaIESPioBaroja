import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const ADMIN_EMAILS = ['junifegu@gmail.com']

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem('usuario')
    return saved ? JSON.parse(saved) : null
  })

  const [pedidosGlobales, setPedidosGlobales] = useState(() => {
    const saved = localStorage.getItem('pedidosGlobales')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (usuario) localStorage.setItem('usuario', JSON.stringify(usuario))
    else localStorage.removeItem('usuario')
  }, [usuario])

  useEffect(() => {
    localStorage.setItem('pedidosGlobales', JSON.stringify(pedidosGlobales))
  }, [pedidosGlobales])

  const loginConGoogle = (emailGoogle) => {
    const esAdmin = ADMIN_EMAILS.includes(emailGoogle)
    const nuevoUsuario = {
      email: emailGoogle,
      nombre: emailGoogle.split('@')[0],
      rol: esAdmin ? 'admin' : 'cliente'
    }
    setUsuario(nuevoUsuario)
  }

  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  const agregarPedidoGlobal = (pedido) => {
    setPedidosGlobales(prev => [pedido, ...prev])
  }

  const actualizarEstadoPedido = (id, nuevoEstado) => {
    setPedidosGlobales(prev =>
      prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p)
    )
  }

  const esAdmin = usuario?.rol === 'admin'

  return (
    <AuthContext.Provider value={{
      usuario, loginConGoogle, cerrarSesion, esAdmin,
      pedidosGlobales, agregarPedidoGlobal, actualizarEstadoPedido
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}