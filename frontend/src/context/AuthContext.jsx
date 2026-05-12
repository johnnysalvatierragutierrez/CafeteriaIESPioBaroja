import { createContext, useContext, useState } from 'react'
import { loginGoogle, logout, getMe } from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(false)

  const login = async (code) => {
    setCargando(true)
    try {
      const res = await loginGoogle(code)
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      setUsuario(res.data.user)
      return res.data.user
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    } finally {
      setCargando(false)
    }
  }

  const cerrarSesion = async () => {
    const refresh = localStorage.getItem('refresh_token')
    try {
      await logout(refresh)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setUsuario(null)
    }
  }

  const esAdmin = usuario?.rol === 'dueño' || usuario?.rol === 'staff'

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, cerrarSesion, esAdmin, setUsuario }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}