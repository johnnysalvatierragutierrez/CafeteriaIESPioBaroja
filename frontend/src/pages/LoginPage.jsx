import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext'
import logoImg from '../assets/kPbL08YN_400x400.jpg'

export default function LoginPage() {
  const navigate = useNavigate()
  const { loginConGoogle } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
      })
      const data = await res.json()
      loginConGoogle(data.email)
      navigate('/')
    },
    onError: () => console.log('Error login Google'),
  })

  return (
    <div className="login-grid" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: "'DM Sans', sans-serif" }}>

      {/* LADO IZQUIERDO */}
      <div className="login-izquierda" style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '48px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', top: '-100px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', bottom: '50px', left: '-80px' }} />
        <div style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(139,195,74,0.15)', bottom: '200px', right: '60px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
          <img src={logoImg} alt="Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', letterSpacing: '0.5px' }}>CAFETERÍA BAROJA</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1px' }}>IES PÍO BAROJA</div>
          </div>
        </div>

        <div style={{ zIndex: 1 }}>
          <div style={{ color: '#8bc34a', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Sin colas. Sin esperas.
          </div>
          <h1 style={{ color: 'white', fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px' }}>
            Tu pedido,<br />
            <span style={{ color: '#8bc34a' }}>listo</span> cuando<br />
            llegues.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '340px' }}>
            Pide desde clase, elige tu franja horaria y recoge sin esperar. El recreo es tuyo.
          </p>
        </div>

        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', zIndex: 1 }}>IES Pío Baroja · Madrid</div>
      </div>

      {/* LADO DERECHO */}
      <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px' }}>
        <div style={{
          width: '100%', maxWidth: '380px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>Iniciar sesión</h2>
          <p style={{ color: '#9e9e9e', fontSize: '0.9rem', margin: '0 0 28px' }}>
            ¿Aún no tienes cuenta?{' '}
            <span onClick={() => navigate('/register')} style={{ color: '#2e7d32', fontWeight: 600, cursor: 'pointer' }}>Regístrate</span>
          </p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Usuario o email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@iespiobaroja.es"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e2e8f0', background: 'white', fontSize: '0.95rem', color: '#1e293b', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#2e7d32'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                style={{ width: '100%', padding: '14px 46px 14px 16px', borderRadius: '12px', border: '2px solid #e2e8f0', background: 'white', fontSize: '0.95rem', color: '#1e293b', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = '#2e7d32'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9e9e9e', fontSize: '1rem' }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button onClick={() => navigate('/')}
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', background: '#2e7d32', color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginBottom: '16px', transition: 'all 0.2s ease' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1b5e20'}
            onMouseLeave={e => e.currentTarget.style.background = '#2e7d32'}>
            Entrar
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0', color: '#9e9e9e', fontSize: '0.8rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />o
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          <button onClick={() => googleLogin()}
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #e2e8f0', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, color: '#1e293b', transition: 'all 0.2s ease', boxSizing: 'border-box' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#2e7d32'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continuar con Google
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}