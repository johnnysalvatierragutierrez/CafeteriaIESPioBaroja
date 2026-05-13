import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartModal from '../components/CartModal'
import PaymentModal from '../components/PaymentModal'
import TimeModal from '../components/TimeModal'
import ConfirmModal from '../components/ConfirmModal'
import logoImg from '../assets/kPbL08YN_400x400.jpg'
import BottomNav from '../components/BottomNav'


const todosLosProductos = [
  { id: 1,  cat: 'combina',    nombre: 'Combina 1: Espinacas / Filete',   precio: 7.80, emoji: '🍱' },
  { id: 2,  cat: 'combina',    nombre: 'Combina 2: Guisantes / Sajonia',  precio: 7.80, emoji: '🍱' },
  { id: 3,  cat: 'combina',    nombre: 'Combina 3: Judías / Lomo',        precio: 7.80, emoji: '🍱' },
  { id: 4,  cat: 'combina',    nombre: 'Combina 4: Mixta / Pollo',        precio: 7.80, emoji: '🥗' },
  { id: 5,  cat: 'combina',    nombre: 'Combina 5: Huevos / Chuleta',     precio: 7.80, emoji: '🍳' },
  { id: 6,  cat: 'combina',    nombre: 'Combina 6: Pasta / Tortilla',     precio: 7.80, emoji: '🍝' },
  { id: 7,  cat: 'especial',   nombre: 'Menú Especial Mar/Mié',           precio: 9.00, emoji: '🍲' },
  { id: 8,  cat: 'especial',   nombre: 'Menú Especial con Postre',        precio: 10.50, emoji: '🍮' },
  { id: 9,  cat: 'desayuno',   nombre: 'Tostada con Tomate',              precio: 1.50, emoji: '🍅' },
  { id: 10, cat: 'desayuno',   nombre: 'Tostada con Mantequilla',         precio: 1.20, emoji: '🧈' },
  { id: 11, cat: 'desayuno',   nombre: 'Croissant',                       precio: 1.80, emoji: '🥐' },
  { id: 12, cat: 'desayuno',   nombre: 'Napolitana de Chocolate',         precio: 1.80, emoji: '🍫' },
  { id: 13, cat: 'desayuno',   nombre: 'Desayuno Completo',               precio: 2.60, emoji: '☀️' },
  { id: 14, cat: 'desayuno',   nombre: 'Yogur con Cereales',              precio: 1.50, emoji: '🥣' },
  { id: 15, cat: 'bocadillos', nombre: 'Bocadillo de Tortilla',           precio: 2.40, emoji: '🥖' },
  { id: 16, cat: 'bocadillos', nombre: 'Bocadillo de Jamón',              precio: 2.60, emoji: '🥖' },
  { id: 17, cat: 'bocadillos', nombre: 'Bocadillo de Queso',              precio: 2.20, emoji: '🧀' },
  { id: 18, cat: 'bocadillos', nombre: 'Bocadillo Mixto',                 precio: 2.80, emoji: '🥪' },
  { id: 19, cat: 'bocadillos', nombre: 'Hamburguesa de Pollo',            precio: 4.00, emoji: '🍔' },
  { id: 20, cat: 'bocadillos', nombre: 'Hamburguesa Mixta',               precio: 4.50, emoji: '🍔' },
  { id: 21, cat: 'cafes',      nombre: 'Café Solo',                       precio: 1.00, emoji: '☕' },
  { id: 22, cat: 'cafes',      nombre: 'Café con Leche',                  precio: 1.40, emoji: '☕' },
  { id: 23, cat: 'cafes',      nombre: 'Capuchino',                       precio: 1.80, emoji: '☕' },
  { id: 24, cat: 'cafes',      nombre: 'Chocolate Caliente',              precio: 2.00, emoji: '🍫' },
  { id: 25, cat: 'cafes',      nombre: 'Café Bombón',                     precio: 1.80, emoji: '☕' },
  { id: 26, cat: 'cafes',      nombre: 'Zumo de Naranja',                 precio: 1.50, emoji: '🍊' },
  { id: 27, cat: 'cafes',      nombre: 'Agua',                            precio: 0.80, emoji: '💧' },
]

const categorias = [
  { id: 'combina',    label: 'Combina',    emoji: '🍱' },
  { id: 'especial',   label: 'Especial',   emoji: '🍲' },
  { id: 'desayuno',   label: 'Desayuno',   emoji: '🥐' },
  { id: 'bocadillos', label: 'Bocadillos', emoji: '🥖' },
  { id: 'cafes',      label: 'Cafés',      emoji: '☕' },
]

const turnos = [
  { label: '11:15', sub: 'Recreo' },
  { label: '14:30', sub: 'Salida' },
]

const navItems = [
  { id: 'menu',      label: 'Menú del día',  emoji: '🏠' },
  { id: 'favoritos', label: 'Mis favoritos', emoji: '⭐' },
  { id: 'pedidos',   label: 'Mis pedidos',   emoji: '📋' },
]

export default function MenuPage() {
  const navigate = useNavigate()
  const { carrito, agregarProducto, vaciarCarrito, total } = useCart()
  const { usuario, esAdmin, cerrarSesion, agregarPedidoGlobal, pedidosGlobales } = useAuth()

  const [vista, setVista] = useState('menu')
  const [categoria, setCategoria] = useState('combina')
  const [modal, setModal] = useState(null)
  const [metodoPago, setMetodoPago] = useState('')
  const [codigoRecogida, setCodigoRecogida] = useState('')
  const [horaRecogida, setHoraRecogida] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [turnoSeleccionado, setTurnoSeleccionado] = useState('11:15')
  const [favoritos, setFavoritos] = useState([])
  const [pedidosHistorial, setPedidosHistorial] = useState([])

  const toggleFavorito = (producto) => {
    setFavoritos(prev =>
      prev.find(f => f.id === producto.id)
        ? prev.filter(f => f.id !== producto.id)
        : [...prev, producto]
    )
  }

  const esFavorito = (id) => favoritos.some(f => f.id === id)

  const generarCodigo = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  }

  const confirmarPedido = (hora) => {
    setHoraRecogida(hora)
    const codigo = generarCodigo()
    setCodigoRecogida(codigo)
    const nuevoPedido = {
      id: Date.now(),
      codigo,
      hora,
      usuario: usuario?.nombre || 'Cliente',
      items: carrito.map(c => c.nombre),
      total: carrito.reduce((a, b) => a + b.precio, 0).toFixed(2),
      estado: 'pagado',
      fecha: new Date().toLocaleDateString(),
    }
    agregarPedidoGlobal(nuevoPedido)
    setPedidosHistorial(prev => [nuevoPedido, ...prev])
    setModal('confirm')
  }

  const handleCerrarSesion = () => {
    cerrarSesion()
    navigate('/login')
  }

  const hora = new Date().getHours()
  const saludo = hora < 12 ? 'Buenos días' : hora < 20 ? 'Buenas tardes' : 'Buenas noches'

  const estadoColor = (estado) => {
    if (estado === 'listo')          return { bg: '#d4edda', text: '#2e7d32', border: '#8bc34a' }
    if (estado === 'en_preparacion') return { bg: '#cce5ff', text: '#2e7d32', border: '#2e7d32' }
    if (estado === 'cancelado')      return { bg: '#f8d7da', text: '#e53e3e', border: '#e53e3e' }
    return                                  { bg: '#d4edda', text: '#2e7d32', border: '#2e7d32' }
  }

  const estadoLabel = (estado) => {
    if (estado === 'listo')          return '✅ Listo para recoger'
    if (estado === 'en_preparacion') return '👨‍🍳 En preparación'
    if (estado === 'cancelado')      return '❌ Cancelado'
    return '💳 Pagado'
  }

  const ProductoCard = ({ producto }) => (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        transition: 'all 0.2s',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,125,50,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
      }}
    >
      <button
        onClick={() => toggleFavorito(producto)}
        style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
      >
        {esFavorito(producto.id) ? '⭐' : '☆'}
      </button>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px', textAlign: 'center' }}>{producto.emoji}</div>
      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', marginBottom: '6px', lineHeight: 1.3, paddingRight: '20px' }}>
        {producto.nombre}
      </div>
      <div style={{ color: '#2e7d32', fontWeight: 800, fontSize: '1.1rem', marginBottom: '12px' }}>
        {producto.precio.toFixed(2)}€
      </div>
      <button
        onClick={() => agregarProducto(producto)}
        style={{ width: '100%', padding: '10px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', transition: 'background 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#1b5e20' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#2e7d32' }}
      >
        Añadir +
      </button>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f8fafc' }}>

      {/* ── Sidebar ── */}
      <div className="sidebar-desktop" style={{ width: '240px', minHeight: '100vh', background: 'white', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'sticky', top: 0, height: '100vh', boxShadow: '2px 0 8px rgba(0,0,0,0.04)' }}>

        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoImg} alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e293b' }}>CAFETERÍA</div>
              <div style={{ fontSize: '0.65rem', color: '#2e7d32', fontWeight: 700, letterSpacing: '1px' }}>BAROJA</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9e9e9e', letterSpacing: '1px', padding: '0 8px', marginBottom: '8px' }}>NAVEGACIÓN</div>
          {navItems.map(item => (
            <div
              key={item.id}
              onClick={() => setVista(item.id)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', marginBottom: '4px', fontSize: '0.9rem', fontWeight: 500, background: vista === item.id ? '#f1f8e9' : 'transparent', color: vista === item.id ? '#2e7d32' : '#64748b', transition: 'all 0.2s' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>{item.emoji} {item.label}</span>
              {item.id === 'favoritos' && favoritos.length > 0 && (
                <span style={{ background: '#2e7d32', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '0.7rem', fontWeight: 700 }}>{favoritos.length}</span>
              )}
              {item.id === 'pedidos' && pedidosHistorial.length > 0 && (
                <span style={{ background: '#2e7d32', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '0.7rem', fontWeight: 700 }}>{pedidosHistorial.length}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f0' }}>
          {esAdmin && (
            <div
              onClick={() => navigate('/admin')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', marginBottom: '12px', fontSize: '0.9rem', fontWeight: 600, background: '#f1f8e9', color: '#2e7d32' }}
            >
              👨‍🍳 Panel Cafetería
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
              {usuario?.nombre?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{usuario?.nombre || 'Usuario'}</div>
              <div style={{ fontSize: '0.7rem', color: '#9e9e9e' }}>{usuario?.email || ''}</div>
            </div>
          </div>
          <button
            onClick={handleCerrarSesion}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '2px solid #2e7d32', background: 'transparent', color: '#2e7d32', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Topbar */}
        <div className="header-movil" style={{ background: 'white', padding: '16px 28px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9e9e9e' }}>🔍</span>
            <input
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              placeholder="Busca bocadillos, cafés..."
              style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '10px', border: '2px solid #f0f0f0', background: '#f8fafc', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={() => setModal('cart')}
            style={{ background: '#2e7d32', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', marginLeft: '16px' }}
          >
            🛒 {carrito.length} · {total}€
          </button>
        </div>

        <div style={{ padding: '28px', flex: 1 }}>

          {/* ── Vista: Menú ── */}
          {vista === 'menu' && (
            <>
              <div style={{ background: 'linear-gradient(135deg, #1b5e20, #2e7d32)', borderRadius: '20px', padding: '28px 32px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(139,195,74,0.15)', top: '-60px', right: '40px' }} />
                <p style={{ color: '#8bc34a', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px' }}>
                  {saludo}, {usuario?.nombre || 'Usuario'} ✨
                </p>
                <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 16px' }}>¿Qué te apetece hoy?</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {turnos.map(t => (
                    <button
                      key={t.label}
                      onClick={() => setTurnoSeleccionado(t.label)}
                      style={{ padding: '8px 16px', borderRadius: '20px', border: '2px solid', borderColor: turnoSeleccionado === t.label ? '#8bc34a' : 'rgba(255,255,255,0.3)', background: turnoSeleccionado === t.label ? '#8bc34a' : 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      🕒 {t.sub} {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {categorias.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoria(cat.id)}
                    style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', background: categoria === cat.id ? '#2e7d32' : 'white', color: categoria === cat.id ? 'white' : '#64748b', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {todosLosProductos
                  .filter(p => p.cat === categoria && p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
                  .map(p => <ProductoCard key={p.id} producto={p} />)
                }
              </div>
            </>
          )}

          {/* ── Vista: Favoritos ── */}
          {vista === 'favoritos' && (
            <>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px' }}>⭐ Mis favoritos</h2>
              {favoritos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9e9e9e' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>☆</div>
                  <p>Aún no tienes favoritos. Pulsa la ⭐ en cualquier producto para guardarlo aquí.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                  {favoritos.map(p => <ProductoCard key={p.id} producto={p} />)}
                </div>
              )}
            </>
          )}

          {/* ── Vista: Pedidos ── */}
          {vista === 'pedidos' && (
            <>
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px' }}>📋 Mis pedidos</h2>
              {pedidosGlobales.filter(p => p.usuario === (usuario?.nombre || 'Cliente')).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9e9e9e' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
                  <p>Aún no has hecho ningún pedido. ¡Empieza pidiendo algo del menú!</p>
                </div>
              ) : (
                pedidosGlobales
                  .filter(p => p.usuario === (usuario?.nombre || 'Cliente'))
                  .map(pedido => {
                    const colores = estadoColor(pedido.estado)
                    return (
                      <div
                        key={pedido.id}
                        style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: '4px solid ' + colores.border }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontFamily: 'Courier New', fontWeight: 800, fontSize: '1.1rem', color: '#2e7d32', letterSpacing: '2px' }}>
                            {pedido.codigo}
                          </span>
                          <span style={{ background: colores.bg, color: colores.text, padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {estadoLabel(pedido.estado)}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>
                          {pedido.items.join(', ')}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                          <span>🕒 {pedido.hora} · {pedido.fecha}</span>
                          <span style={{ fontWeight: 800, color: '#2e7d32' }}>{pedido.total}€</span>
                        </div>
                      </div>
                    )
                  })
              )}
            </>
          )}

        </div>
      </div>

      {modal === 'cart'    && <CartModal    carrito={carrito} total={total} onClose={() => setModal(null)} onContinuar={() => setModal('payment')} />}
      {modal === 'payment' && <PaymentModal onClose={() => setModal(null)} onSeleccionar={(m) => { setMetodoPago(m); setModal('time') }} />}
      {modal === 'time'    && <TimeModal    onClose={() => setModal(null)} onSeleccionar={confirmarPedido} />}
      {modal === 'confirm' && <ConfirmModal codigo={codigoRecogida} hora={horaRecogida} metodoPago={metodoPago} onClose={() => { setModal(null); vaciarCarrito() }} />}
      <BottomNav vista={vista} setVista={setVista} esAdmin={esAdmin} />
    </div>
  )
}
