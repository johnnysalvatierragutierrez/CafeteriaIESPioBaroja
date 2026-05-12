const pedidosMock = [
  { id: 101, codigo: 'AB3K9Z', cliente: 'María García', turno: '11:15', estado: 'pagado', total: 7.80, items: ['Combina 1: Espinacas / Filete'] },
  { id: 102, codigo: 'XP2M7Q', cliente: 'Juan López', turno: '11:15', estado: 'en_preparacion', total: 3.80, items: ['Café', 'Bocadillo Clásico'] },
  { id: 103, codigo: 'RT5N1W', cliente: 'Ana Martínez', turno: '14:30', estado: 'listo', total: 9.00, items: ['Menú Especial'] },
]

const coloresEstado = {
  pagado: '#fff3cd',
  en_preparacion: '#cce5ff',
  listo: '#d4edda',
  recogido: '#e2e3e5',
}

export default function AdminPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{ fontSize: '2rem' }}>👨‍🍳</span>
        <h1 style={{ color: 'var(--verde-oscuro)', fontSize: '1.5rem' }}>Panel de Cafetería</h1>
      </div>

      {pedidosMock.map(pedido => (
        <div key={pedido.id} style={{
          background: 'white', borderRadius: '15px', padding: '15px',
          marginBottom: '12px', boxShadow: 'var(--shadow)',
          borderLeft: '5px solid var(--verde-oscuro)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Courier New', color: 'var(--verde-oscuro)', letterSpacing: '2px' }}>
                {pedido.codigo}
              </span>
              <span style={{ marginLeft: '10px', fontSize: '0.85rem', color: '#666' }}>
                🕒 {pedido.turno}
              </span>
            </div>
            <span style={{
              padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem',
              fontWeight: 'bold', background: coloresEstado[pedido.estado]
            }}>
              {pedido.estado.replace('_', ' ')}
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#444', marginBottom: '8px' }}>
            {pedido.items.join(', ')}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, color: 'var(--verde-oscuro)' }}>{pedido.total.toFixed(2)}€ ✓ Pagado</span>
            <button style={{
              background: 'var(--verde-oscuro)', color: 'white', border: 'none',
              padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem'
            }}>
              Marcar listo
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}