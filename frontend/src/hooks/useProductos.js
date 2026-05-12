import { useState, useEffect } from 'react'

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

export function useProductos(categoria) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setCargando(true)
    const timer = setTimeout(() => {
      const filtrados = categoria
        ? menuData.filter(p => p.cat === categoria)
        : menuData
      setProductos(filtrados)
      setCargando(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [categoria])

  return { productos, cargando }
}