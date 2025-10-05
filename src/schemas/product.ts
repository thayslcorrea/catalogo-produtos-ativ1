import { z } from 'zod'


export const productCreateSchema = z.object({
    title: z.string().min(3, { message: 'title must have at least 3 characters' }),
    description: z.string().min(10, { message: 'description must have at least 10 characters' }),
    imageUrl: z.string().min(1, { message: 'imageUrl is required' }),
    price: z.number().nonnegative({ message: 'price must be >= 0' })
})


export const productUpdateSchema = productCreateSchema.partial()


export type ProductCreateInput = z.infer<typeof productCreateSchema>
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>