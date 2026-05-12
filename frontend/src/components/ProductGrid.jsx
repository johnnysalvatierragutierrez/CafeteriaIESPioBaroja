export default function ProductGrid({ productos, onAgregar }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="grid-productos">
        {productos.map(producto => (
          <div
            key={producto.id}
            className="product-card"
            style={{
              background: 'var(--card)', padding: '1rem', borderRadius: '15px',
              boxShadow: 'var(--shadow)', textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.03)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              cursor: 'pointer', transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--verde-pastel)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--card)'}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>{producto.emoji}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '5px', lineHeight: 1.1 }}>
              {producto.nombre}
            </div>
            <div style={{ color: 'var(--verde-oscuro)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '8px' }}>
              {producto.precio.toFixed(2)}€
            </div>
            <button
              onClick={() => onAgregar(producto)}
              style={{
                width: '100%', padding: '8px', background: 'var(--verde-claro)',
                border: 'none', borderRadius: '8px', color: 'white',
                fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem'
              }}
            >
              Añadir +
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}