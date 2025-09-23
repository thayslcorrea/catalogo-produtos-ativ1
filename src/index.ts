import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// GET /products
app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// GET /products/:id
app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ error: "Produto não encontrado" });
  res.json(product);
});

// ✅ POST /products
app.post("/products", async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || price === undefined) {
    return res.status(400).json({ error: "title, description e price são obrigatórios" });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// Iniciar servidor
app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3333}`);
});
