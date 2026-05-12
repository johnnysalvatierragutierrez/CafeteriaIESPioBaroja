import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/kPbL08YN_400x400.jpg'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ nombre: '', apellido: '', usuario: '', email: '', password: '', password2: '' })

  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: '12px',
    border: '2px solid #e2e8f0', background: 'white',
    fontSize: '0.9rem', color: '#1e293b', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', sans-serif"
  }

  const labelStyle = {
    fontSize: '0.72rem', fontWeight: 700, color: '#64748b',
    letterSpacing: '1px', textTransform: 'uppercase',
    display: 'block', marginBottom: '6px'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: "'DM Sans', sans-serif" }}>

      {/* IZQUIERDA */}
      <div style={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '48px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', top: '-100px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(139,195,74,0.15)', bottom: '150px', right: '60px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
          <img src={logoImg} alt="Logo" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' }} />
          <div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem' }}>CAFETERÍA BAROJA</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1px' }}>IES PÍO BAROJA</div>
          </div>
        </div>

        <div style={{ zIndex: 1 }}>
          <div style={{ color: '#8bc34a', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
            Únete ahora
          </div>
          <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px' }}>
            Crea tu<br />
            <span style={{ color: '#8bc34a' }}>cuenta</span> y<br />
            empieza a pedir.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '320px' }}>
            Solo necesitas un minuto. Regístrate y olvídate de las colas para siempre.
          </p>
        </div>

        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', zIndex: 1 }}>IES Pío Baroja · Madrid</div>
      </div>

      {/* DERECHA */}
      <div style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 48px', overflowY: 'auto' }}>
        <div style={{
          width: '100%', maxWidth: '400px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px' }}>Crea tu cuenta</h2>
          <p style={{ color: '#9e9e9e', fontSize: '0.9rem', margin: '0 0 24px' }}>
            Pide tu desayuno antes del recreo y sáltate las colas.
          </p>

          {/* Nombre y Apellido */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#2e7d32'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>
            <div>
              <label style={labelStyle}>Apellido</label>
              <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="García" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#2e7d32'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
            </div>
          </div>

          {/* Usuario */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Usuario</label>
            <input name="usuario" value={form.usuario} onChange={handleChange} placeholder="juan.garcia" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#2e7d32'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="juan@iespiobaroja.es" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#2e7d32'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres"
                style={{ ...inputStyle, paddingRight: '46px' }}
                onFocus={e => e.target.style.borderColor = '#2e7d32'}
                onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9e9e9e' }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Repetir contraseña */}
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Repetir contraseña</label>
            <input name="password2" type="password" value={form.password2} onChange={handleChange} placeholder="••••••••" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#2e7d32'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
          </div>

          {/* Botón */}
          <button
            onClick={() => navigate('/')}
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', background: '#2e7d32', color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', marginBottom: '16px', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1b5e20'}
            onMouseLeave={e => e.currentTarget.style.background = '#2e7d32'}
          >
            Crear cuenta
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#9e9e9e' }}>
            ¿Ya tienes cuenta?{' '}
            <span onClick={() => navigate('/login')} style={{ color: '#2e7d32', fontWeight: 700, cursor: 'pointer' }}>
              Inicia sesión
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}