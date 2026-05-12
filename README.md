# Cafetería IES Pío Baroja 🍽️

Proyecto de 2º DAW — IES Pío Baroja

---

## ¿Qué es esto?

Una app web para hacer pre-pedidos en la cafetería del insti. La idea es simple: en vez de hacer cola en el recreo, pides desde el móvil antes y vas a recogerlo directamente. Nos inspiramos en cómo funciona la app de McDonald's.

## ¿Cómo está montado?

El proyecto tiene dos partes:

**Frontend** hecho en React con Vite. Tiene varias páginas (menú, login, panel de admin) y usamos Context API para el carrito y la autenticación, hooks propios para cargar productos y axios para conectar con la API.

**Backend** hecho en Django con Django REST Framework. Tiene autenticación con JWT y Google OAuth, gestión de productos, pedidos, pagos con Redsys y estadísticas para el dueño.

## Arrancar el proyecto

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre el navegador en http://localhost:5173

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
python manage.py migrate
python manage.py runserver
```

La API corre en http://localhost:8000/api/

## Endpoints principales

| Método | Ruta | Qué hace |
|--------|------|----------|
| POST | /api/auth/google/ | Login con Google |
| GET | /api/productos/ | Lista el catálogo |
| POST | /api/pedidos/ | Hace un pedido |
| PATCH | /api/pedidos/{id}/estado/ | Cambia el estado |
| GET | /api/estadisticas/resumen/ | Stats del día |

## Cómo funciona por dentro

El flujo básico es: entras con Google, navegas el menú, añades cosas al carrito, eliges si recoges en el recreo o a la salida, pagas y te dan un código. El personal de la cafetería ve los pedidos en su panel y los va marcando según los prepara.

Hay dos tipos de usuario: cliente (alumnos y profe) y admin (el personal de cafetería y el dueño).

## Autores

Johnny Salvatierra Gutiérrez y Juan Nicolás Fernández Guevara — 2º DAW