import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({ message: 'Validation failed', issues: err.errors })
    }


    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        return res.status(404).json({ message: 'Resource not found' })
    }


    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
}