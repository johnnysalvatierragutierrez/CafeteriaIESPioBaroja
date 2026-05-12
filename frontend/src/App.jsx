import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import AdminPage from './pages/AdminPage'

function RutaProtegida({ children }) {
  const token = localStorage.getItem('access_token')
  // De momento dejamos pasar sin token para desarrollo
  // Cuando conectemos el backend real, cambiamos esto
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <RutaProtegida>
          <MenuPage />
        </RutaProtegida>
      } />
      <Route path="/admin" element={
        <RutaProtegida>
          <AdminPage />
        </RutaProtegida>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App