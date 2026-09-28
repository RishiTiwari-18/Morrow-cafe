import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import healthRouter from './routes/health.route.js'
import voucherRouter from './routes/voucher.route.js'
import menuRouter from './routes/menu.route.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN || true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Morrow Café API',
    status: 'running',
    docs: {
      health: 'GET /api/health',
      voucherClaim: 'POST /api/voucher/claim',
      voucherList: 'GET /api/voucher',
      voucherDetail: 'GET /api/voucher/:code',
      menuList: 'GET /api/menu',
      menuSeed: 'POST /api/menu/seed',
      menuCreate: 'POST /api/menu',
    },
  })
})

app.use('/api/health', healthRouter)
app.use('/api/voucher', voucherRouter)
app.use('/api/menu', menuRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors: err.errors || [],
    data: null,
  })
})

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
    data: null,
  })
})

export default app
