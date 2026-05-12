const categorias = [
  { id: 'combina', label: '🍱 Combina' },
  { id: 'especial', label: '🍲 Especial' },
  { id: 'desayuno', label: '☕ Desayuno' },
  { id: 'bocadillos', label: '🥖 Bocadillos' },
  { id: 'cafes', label: '☕ Cafés' },
]

export default function CategoriesNav({ categoriaActiva, onCategoriaChange }) {
  return (
    <div style={{
      display: 'flex', gap: '8px', padding: '12px', overflowX: 'auto',
      background: 'rgba(255,255,255,0.8)', position: 'sticky', top: '60px', zIndex: 900,
      scrollbarWidth: 'none'
    }}>
      {categorias.map(cat => (
        <button
          key={cat.id}
          onClick={() => onCategoriaChange(cat.id)}
          style={{
            padding: '8px 16px', borderRadius: '20px', border: 'none',
            background: categoriaActiva === cat.id ? 'var(--verde-oscuro)' : 'white',
            color: categoriaActiva === cat.id ? 'white' : 'var(--verde-oscuro)',
            fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)', whiteSpace: 'nowrap', fontSize: '0.8rem'
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}