import { useState } from 'react'
import Navbar from '../components/Navbar'
import CategoriesNav from '../components/CategoriesNav'
import ProductGrid from '../components/ProductGrid'
import CartModal from '../components/CartModal'
import PaymentModal from '../components/PaymentModal'
import TimeModal from '../components/TimeModal'
import ConfirmModal from '../components/ConfirmModal'

const menuData = [
  { id: 1, cat: 'combina', nombre: 'Combina 1: Espinacas / Filete', precio: 7.80, emoji: '🍱' },
  { id: 2, cat: 'combina', nombre: 'Combina 2: Guisantes / Sajonia', precio: 7.80, emoji: '🍱' },
  { id: 3, cat: 'combina', nombre: 'Combina 3: Judías / Lomo', precio: 7.80, emoji: '🍱' },
  { id: 4, cat: 'combina', nombre: 'Combina 4: Mixta / Pollo', precio: 7.80, emoji: '🥗' },
  { id: 5, cat: 'combina', nombre: 'Combina 5: Huevos / Chuleta', precio: 7.80, emoji: '🍳' },
  { id: 6, cat: 'combina', nombre: 'Combina 6: Pasta / Tortilla', precio: 7.80, emoji: '🍝' },
  { id: 7, cat: 'especial', nombre: 'Menú Especial (Mar/Mié)', precio: 9.00, emoji: '🍲' },
  { id: 8, cat: 'desayuno', nombre: 'Desayuno Baroja', precio: 2.60, emoji: '🥐' },
  { id: 9, cat: 'bocadillos', nombre: 'Bocadillo Clásico', precio: 2.40, emoji: '🥖' },
  { id: 10, cat: 'bocadillos', nombre: 'Hamburguesa', precio: 4.00, emoji: '🍔' },
  { id: 11, cat: 'cafes', nombre: 'Café', precio: 1.40, emoji: '☕' },
  { id: 12, cat: 'cafes', nombre: 'Bebida Especial', precio: 2.00, emoji: '🍫' },
]

export default function MenuPage() {
  const [categoria, setCategoria] = useState('combina')
  const [carrito, setCarrito] = useState([])
  const [modal, setModal] = useState(null) // 'cart' | 'payment' | 'time' | 'confirm'
  const [metodoPago, setMetodoPago] = useState('')
  const [codigoRecogida, setCodigoRecogida] = useState('')
  const [horaRecogida, setHoraRecogida] = useState('')

  const productosFiltrados = menuData.filter(p => p.cat === categoria)

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto])
  }

  const total = carrito.reduce((a, b) => a + b.precio, 0).toFixed(2)

  const generarCodigo = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    return Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  }

  const confirmarPedido = (hora) => {
    setHoraRecogida(hora)
    setCodigoRecogida(generarCodigo())
    setModal('confirm')
  }

  return (
    <div>
      <Navbar cartCount={carrito.length} onCartClick={() => setModal('cart')} />
      <CategoriesNav categoriaActiva={categoria} onCategoriaChange={setCategoria} />
      <ProductGrid productos={productosFiltrados} onAgregar={agregarAlCarrito} />
      
      {modal === 'cart' && (
        <CartModal carrito={carrito} total={total} onClose={() => setModal(null)} onContinuar={() => setModal('payment')} />
      )}
      {modal === 'payment' && (
        <PaymentModal onClose={() => setModal(null)} onSeleccionar={(m) => { setMetodoPago(m); setModal('time') }} />
      )}
      {modal === 'time' && (
        <TimeModal onClose={() => setModal(null)} onSeleccionar={confirmarPedido} />
      )}
      {modal === 'confirm' && (
        <ConfirmModal codigo={codigoRecogida} hora={horaRecogida} metodoPago={metodoPago} onClose={() => { setModal(null); setCarrito([]) }} />
      )}
    </div>
  )
}