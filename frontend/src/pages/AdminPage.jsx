import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const coloresEstado = {
  pendiente_pago: '#fff3cd',
  pagado: '#cce5ff',
  en_preparacion: '#fff3cd',
  listo: '#d4edda',
  recogido: '#e2e3e5',
  cancelado: '#f8d7da',
}

const siguienteEstado = {
  pagado: 'en_preparacion',
  en_preparacion: 'listo',
  listo: 'recogido',
}

const etiquetaBoton = {
  pagado: 'Iniciar preparación',
  en_preparacion: 'Marcar listo',
  listo: 'Marcar recogido',
}

export default function AdminPage() {
  const { pedidosGlobales, actualizarEstadoPedido, usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const pedidosPendientes = pedidosGlobales.filter(p => p.estado !== 'recogido' && p.estado !== 'cancelado')
  const pedidosCompletados = pedidosGlobales.filter(p => p.estado === 'recogido' || p.estado === 'cancelado')

  const handleCerrarSesion = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f8fafc' }}>

      {/* SIDEBAR */}
      <div className="sidebar-desktop" style={{ width: '240px', minHeight: '100vh', background: 'white', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1e293b' }}>👨‍🍳 Panel Cafetería</div>
          <div style={{ fontSize: '0.75rem', color: '#9e9e9e', marginTop: '4px' }}>Vista administrador</div>
        </div>

        <div style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ padding: '10px 12px', borderRadius: '10px', background: '#f1f8e9', color: '#2e7d32', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
            📋 Pedidos activos <span style={{ background: '#2e7d32', color: 'white', borderRadius: '10px', padding: '1px 8px', fontSize: '0.75rem', marginLeft: '6px' }}>{pedidosPendientes.length}</span>
          </div>
          <div onClick={() => navigate('/')}
            style={{ padding: '10px 12px', borderRadius: '10px', color: '#64748b', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>
            🏠 Volver al menú
          </div>
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
              {usuario?.nombre?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{usuario?.nombre || 'Admin'}</div>
              <div style={{ fontSize: '0.7rem', color: '#9e9e9e' }}>{usuario?.email || ''}</div>
            </div>
          </div>
          <button onClick={handleCerrarSesion}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '2px solid #2e7d32', background: 'transparent', color: '#2e7d32', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ flex: 1, padding: '28px' }}>

        {/* STATS */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Pendientes', value: pedidosPendientes.length, color: '#fff3cd', icon: '⏳' },
            { label: 'Completados', value: pedidosCompletados.length, color: '#d4edda', icon: '✅' },
            { label: 'Total ingresos', value: pedidosGlobales.reduce((a, p) => a + parseFloat(p.total || 0), 0).toFixed(2) + '€', color: '#cce5ff', icon: '💰' },
          ].map((stat, i) => (
            <div key={i} style={{ background: stat.color, borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1e293b' }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* PEDIDOS ACTIVOS */}
        <h2 style={{ fontWeight: 800, fontSize: '1.3rem', color: '#1e293b', marginBottom: '16px' }}>
          📋 Pedidos Entrantes
        </h2>

        {pedidosPendientes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9e9e9e', background: 'white', borderRadius: '16px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>☕</div>
            <p>No hay pedidos pendientes. ¡Todo tranquilo por ahora!</p>
          </div>
        ) : (
          pedidosPendientes.map(pedido => (
            <div key={pedido.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: '4px solid #2e7d32' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'Courier New', fontWeight: 800, fontSize: '1.1rem', color: '#2e7d32', letterSpacing: '2px' }}>{pedido.codigo}</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>🕒 {pedido.hora}</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>👤 {pedido.usuario}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: coloresEstado[pedido.estado], padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {pedido.estado.replace('_', ' ')}
                  </span>
                  <span style={{ fontWeight: 800, color: '#2e7d32', fontSize: '1rem' }}>{pedido.total}€</span>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>
                {pedido.items.map((item, i) => (
                  <span key={i} style={{ display: 'inline-block', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px 8px', marginRight: '6px', marginBottom: '4px' }}>
                    {item}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {siguienteEstado[pedido.estado] && (
                  <button
                    onClick={() => actualizarEstadoPedido(pedido.id, siguienteEstado[pedido.estado])}
                    style={{ padding: '8px 20px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                    {etiquetaBoton[pedido.estado]}
                  </button>
                )}
                <button
                  onClick={() => actualizarEstadoPedido(pedido.id, 'cancelado')}
                  style={{ padding: '8px 20px', background: 'white', color: '#e53e3e', border: '2px solid #fed7d7', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                  Cancelar
                </button>
              </div>
            </div>
          ))
        )}

        {/* PEDIDOS COMPLETADOS */}
        {pedidosCompletados.length > 0 && (
          <>
            <h2 style={{ fontWeight: 800, fontSize: '1.3rem', color: '#1e293b', margin: '28px 0 16px' }}>✅ Completados</h2>
            {pedidosCompletados.map(pedido => (
              <div key={pedido.id} style={{ background: 'white', borderRadius: '16px', padding: '16px 20px', marginBottom: '8px', opacity: 0.7, borderLeft: '4px solid #9e9e9e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Courier New', fontWeight: 700, color: '#9e9e9e', letterSpacing: '2px' }}>{pedido.codigo}</span>
                  <span style={{ background: coloresEstado[pedido.estado], padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>{pedido.estado}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9e9e9e', marginTop: '4px' }}>{pedido.items.join(', ')} · {pedido.total}€</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}