import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { errorHandler, notFound } from './middleware/errorHandlers.js'
import ordersRoutes from './routes/orders.routes.js'
import productsRoutes from './routes/products.routes.js'
import usersRoutes from './routes/users.routes.js'
import vendorsRoutes from './routes/vendors.routes.js'
import connectDB from './utils/connectDB.js'
import { IS_DEV, NODE_ENV, PORT } from './utils/constants.js'

await connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://favorkart-client.vercel.app',
    ],
    credentials: true,
  }),
)
if (IS_DEV) app.use(morgan('dev'))

// Routes
app.use('/api/users/', usersRoutes)
app.use('/api/vendors/', vendorsRoutes)
app.use('/api/products/', productsRoutes)
app.use('/api/orders/', ordersRoutes)

// Custom Error Handlers
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(
    `Server up & running in ${NODE_ENV} mode, & is listening for requests at http://127.0.0.1:${PORT}`,
  )
})
