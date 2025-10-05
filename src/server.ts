import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productsRouter from './routes/products'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3333
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? 'http://localhost:5173'

app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(express.json())

app.use('/products', productsRouter)

app.get('/', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})