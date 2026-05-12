import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const ADMIN_EMAILS = ['junifegu@gmail.com']

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  const loginConGoogle = (emailGoogle) => {
    const esAdmin = ADMIN_EMAILS.includes(emailGoogle)
    setUsuario({
      email: emailGoogle,
      nombre: emailGoogle.split('@')[0],
      rol: esAdmin ? 'admin' : 'cliente'
    })
  }

  const cerrarSesion = () => setUsuario(null)

  const esAdmin = usuario?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ usuario, loginConGoogle, cerrarSesion, esAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}