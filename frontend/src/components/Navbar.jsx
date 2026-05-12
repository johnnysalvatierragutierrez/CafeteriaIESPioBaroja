import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/kPbL08YN_400x400.jpg'

export default function Navbar({ cartCount, onCartClick }) {
  const navigate = useNavigate()

  return (
    <nav style={{
      background: 'white', padding: '1rem', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      boxShadow: 'var(--shadow)', position: 'sticky', top: 0, zIndex: 1000
    }}>
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
      >
        <img src={logoImg} alt="Logo" style={{
          width: '35px', height: '35px', objectFit: 'contain', borderRadius: '50%'
        }} />
        <span className="navbar-title" style={{ fontWeight: 800, color: 'var(--verde-oscuro)' }}>
          CAFETERÍA BAROJA
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/admin')}
          style={{
            background: 'none', border: '2px solid var(--verde-oscuro)',
            color: 'var(--verde-oscuro)', padding: '6px 12px',
            borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem'
          }}
        >
          Admin
        </button>
        <button onClick={onCartClick} style={{
          background: 'var(--verde-oscuro)', color: 'white', border: 'none',
          padding: '8px 14px', borderRadius: '20px', cursor: 'pointer',
          fontWeight: 'bold', fontSize: '0.85rem'
        }}>
          🛒 {cartCount}
        </button>
      </div>
    </nav>
  )
}