export default function CartModal({ carrito, total, onClose, onContinuar }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      zIndex: 2000, display: 'flex', justifyContent: 'center',
      alignItems: 'center', padding: '15px'
    }}>
      <div style={{
        background: 'white', width: '100%', maxWidth: '400px',
        padding: '20px', borderRadius: '20px', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '15px' }}>Tu Pedido</h2>
        <div style={{ marginBottom: '15px' }}>
          {carrito.length === 0
            ? <p style={{ color: 'var(--gris)' }}>El carrito está vacío</p>
            : carrito.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '0.85rem', marginBottom: '5px'
              }}>
                <span>{item.nombre.substring(0, 25)}...</span>
                <b>{item.precio.toFixed(2)}€</b>
              </div>
            ))
          }
        </div>
        <div style={{ fontWeight: 800, marginBottom: '15px' }}>
          Total: {total}€
        </div>
        <button
          onClick={onContinuar}
          style={{
            background: 'var(--verde-oscuro)', color: 'white', width: '100%',
            padding: '14px', border: 'none', borderRadius: '12px',
            fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginBottom: '10px'
          }}
        >
          Continuar
        </button>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#666', width: '100%'
        }}>
          Cerrar
        </button>
      </div>
    </div>
  )
}