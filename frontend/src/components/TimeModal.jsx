const turnos = [
  { label: '🕒 Recreo (11:15)', valor: '11:15' },
  { label: '🕒 Salida (14:30)', valor: '14:30' },
]

export default function TimeModal({ onClose, onSeleccionar }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      zIndex: 2000, display: 'flex', justifyContent: 'center',
      alignItems: 'center', padding: '15px'
    }}>
      <div style={{
        background: 'white', width: '100%', maxWidth: '400px',
        padding: '20px', borderRadius: '20px'
      }}>
        <h2 style={{ marginBottom: '15px' }}>Hora de Recogida</h2>
        {turnos.map((turno, i) => (
          <div
            key={i}
            onClick={() => onSeleccionar(turno.valor)}
            style={{
              border: '2px solid #eee', padding: '12px', borderRadius: '12px',
              marginBottom: '8px', cursor: 'pointer', fontWeight: 'bold',
              textAlign: 'center', fontSize: '0.95rem'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--verde-oscuro)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#eee'}
          >
            {turno.label}
          </div>
        ))}
        <button onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#666', width: '100%', marginTop: '10px'
        }}>
          Cerrar
        </button>
      </div>
    </div>
  )
}