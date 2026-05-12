import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MenuPage from './pages/MenuPage'
import AdminPage from './pages/AdminPage'

function RutaProtegida({ children }) {
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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