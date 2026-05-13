import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function BottomNav({ vista, setVista, esAdmin }) {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'none',
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'white', borderTop: '1px solid #f0f0f0',
      padding: '8px 0', zIndex: 1000,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.08)'
    }} className="bottom-nav">
      {[
        { id: 'menu', emoji: '🏠', label: 'Inicio' },
        { id: 'favoritos', emoji: '⭐', label: 'Favoritos' },
        { id: 'pedidos', emoji: '📋', label: 'Pedidos' },
        ...(esAdmin ? [{ id: 'admin', emoji: '👨‍🍳', label: 'Admin' }] : []),
      ].map(item => (
        <button
          key={item.id}
          onClick={() => item.id === 'admin' ? navigate('/admin') : setVista(item.id)}
          style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '4px 8px', color: vista === item.id ? '#2e7d32' : '#9e9e9e',
            fontSize: '0.65rem', fontWeight: vista === item.id ? 700 : 400,
            fontFamily: "'DM Sans', sans-serif"
          }}>
          <span style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{item.emoji}</span>
          {item.label}
        </button>
      ))}
    </div>
  )
}