import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const agregarProducto = (producto) => {
    setCarrito(prev => [...prev, producto])
  }

  const vaciarCarrito = () => setCarrito([])

  const total = carrito.reduce((a, b) => a + b.precio, 0).toFixed(2)

  return (
    <CartContext.Provider value={{ carrito, agregarProducto, vaciarCarrito, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}