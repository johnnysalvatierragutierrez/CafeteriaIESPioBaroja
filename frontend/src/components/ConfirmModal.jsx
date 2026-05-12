export default function ConfirmModal({ codigo, hora, metodoPago, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      zIndex: 2000, display: 'flex', justifyContent: 'center',
      alignItems: 'center', padding: '15px'
    }}>
      <div style={{
        background: 'white', width: '100%', maxWidth: '400px',
        padding: '20px', borderRadius: '20px', textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--verde-oscuro)', marginBottom: '15px' }}>
          ¡Pedido Confirmado!
        </h2>
        <div style={{
          textAlign: 'left', marginBottom: '15px', background: '#f8fafc',
          padding: '15px', borderRadius: '10px', fontSize: '0.9rem'
        }}>
          <p><b>Recogida:</b> {hora}</p>
          <p><b>Pago:</b> {metodoPago}</p>
        </div>
        {metodoPago === '📱 Pago Bizum'
          ? <p>Envía el Bizum al <b>635765983</b></p>
          : <p>Presenta este código al pagar:</p>
        }
        <div style={{
          background: '#e8f5e9', padding: '15px', borderRadius: '10px',
          border: '2px dashed var(--verde-oscuro)', fontSize: '2rem',
          fontFamily: 'Courier New, monospace', color: 'var(--verde-oscuro)',
          margin: '10px 0', letterSpacing: '4px', fontWeight: 800
        }}>
          {codigo}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'grey', marginBottom: '15px' }}>
          ¡Recoge la mesa al terminar! Muchas gracias por colaborar.
        </p>
        <button
          onClick={onClose}
          style={{
            background: 'var(--verde-oscuro)', color: 'white', width: '100%',
            padding: '14px', border: 'none', borderRadius: '12px',
            fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem'
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}