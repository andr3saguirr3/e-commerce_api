import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import productsRouter from './routes/products.js'
import categoriesRouter from './routes/categories.js'

const app = new Hono()

// ✅ Habilitar CORS para todas las rutas
app.use('*', cors({
  origin: 'http://localhost:3000', // o '*' si quieres permitir todos
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/products', productsRouter)
app.route('/categories', categoriesRouter)

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
