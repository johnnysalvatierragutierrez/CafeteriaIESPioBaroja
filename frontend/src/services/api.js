import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para añadir el token JWT a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth
export const loginGoogle = (code) => api.post('/auth/google/', { code })
export const refreshToken = (refresh) => api.post('/auth/refresh/', { refresh })
export const logout = (refresh) => api.post('/auth/logout/', { refresh })
export const getMe = () => api.get('/auth/me/')

// Productos
export const getProductos = (params) => api.get('/productos/', { params })
export const getProducto = (id) => api.get(`/productos/${id}/`)

// Pedidos
export const crearPedido = (data) => api.post('/pedidos/', data)
export const getPedidos = (params) => api.get('/pedidos/', { params })
export const getPedido = (id) => api.get(`/pedidos/${id}/`)
export const actualizarEstadoPedido = (id, estado) => api.patch(`/pedidos/${id}/estado/`, { estado })

// Pagos
export const getEstadoPago = (pedidoId) => api.get(`/pagos/${pedidoId}/estado/`)

// Inventario
export const getInventario = () => api.get('/inventario/')
export const actualizarStock = (productoId, data) => api.patch(`/inventario/${productoId}/`, data)

// Estadísticas
export const getResumen = (params) => api.get('/estadisticas/resumen/', { params })
export const getVentasPorProducto = (params) => api.get('/estadisticas/ventas-por-producto/', { params })
export const getVentasPorTurno = (params) => api.get('/estadisticas/ventas-por-turno/', { params })

export default api