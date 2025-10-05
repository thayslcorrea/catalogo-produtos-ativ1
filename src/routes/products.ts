import { Router } from 'express'
import prisma from '../prisma'
import { productCreateSchema, productUpdateSchema } from '../schemas/product'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'


const router = Router()


// GET /api/products - list all
router.get('/', async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({ orderBy: { id: 'asc' } })
        return res.status(200).json(products)
    } catch (err) {
        next(err)
    }
})


// GET /api/products/:id - get by id
router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido' })
        }


        const product = await prisma.product.findUnique({ where: { id } })
        if (!product) return res.status(404).json({ message: 'Product not found' })
        return res.status(200).json(product)
    } catch (err) {
        next(err)
    }
})


// POST /api/products - create
router.post('/', async (req, res, next) => {
    try {
        const result = productCreateSchema.safeParse(req.body)
        if (!result.success) {
          // retorna 400 direto sem lançar exceção
          return res.status(400).json({
            message: 'Validation failed',
            issues: result.error.errors,
          })
        }
    
        const created = await prisma.product.create({ data: result.data })
        return res.status(201).json(created)
      } catch (err) {
        next(err) // outros erros vão para o middleware
      }
})


// PUT /api/products/:id - update (partial)
router.put('/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'ID inválido' })
      }
  
      // Validação com safeParse
      const result = productUpdateSchema.safeParse(req.body)
      if (!result.success) {
        return res.status(400).json({
          message: 'Validation failed',
          issues: result.error.errors,
        })
      }
  
      // Atualiza produto no banco
      const updated = await prisma.product.update({
        where: { id },
        data: result.data,
      })
  
      return res.status(200).json(updated)
    } catch (err) {
      // Prisma P2025 -> produto não encontrado
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') return next(err)
      // Outros erros vão para middleware global
      next(err)
    }
  })


// DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id)
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido' })
        }


        await prisma.product.delete({ where: { id } })
        return res.status(204).send()
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') return next(err)
        next(err)
    }
})


export default router