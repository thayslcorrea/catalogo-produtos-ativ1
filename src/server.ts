import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ status: "ok" })
})

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products)
})

app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id)
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) return res.status(404).json({ error: "Produto não encontrado" })
  res.json(product)
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3333}`)
})