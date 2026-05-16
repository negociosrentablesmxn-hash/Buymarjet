import 'dotenv/config'
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth.routes'
import investmentRoutes from './routes/investment.routes'
import portfolioRoutes from './routes/portfolio.routes'
import transactionRoutes from './routes/transaction.routes'
import userRoutes from './routes/user.routes'

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware de seguridad
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Logging
app.use(morgan('combined'))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Demasiadas solicitudes, intenta más tarde',
})
app.use('/api/', limiter)

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // límite de 5 requests por minuto
  message: 'Demasiados intentos, intenta más tarde',
})

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Rutas
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/investments', investmentRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/user', userRoutes)

// Manejo de errores global
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    status: err.status || 500,
  })
})

// Ruta no encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📊 API disponible en http://localhost:${PORT}/api`)
})

export default app