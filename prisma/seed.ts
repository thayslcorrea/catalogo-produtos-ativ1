import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
    const existing = await prisma.product.count()
    if (existing > 0) {
        console.log('Seed skipped: products already exist')
        return
    }


    const items = [
        {
            title: 'Camiseta Azul',
            description: 'Camiseta 100% algodão, tamanho M',
            imageUrl: 'https://example.com/camiseta-azul.jpg',
            price: 49.9
        },
        {
            title: 'Caneca Ceramic',
            description: 'Caneca de cerâmica branca 300ml',
            imageUrl: 'https://example.com/caneca.jpg',
            price: 29.9
        },
        {
            title: 'Mouse Gamer',
            description: 'Mouse com DPI ajustável e iluminação RGB',
            imageUrl: 'https://example.com/mouse.jpg',
            price: 129.99
        },
        {
            title: 'Teclado Mecânico',
            description: 'Switches azuis e retroiluminação',
            imageUrl: 'https://example.com/teclado.jpg',
            price: 349.9
        },
        {
            title: 'Mochila 20L',
            description: 'Mochila resistente, ideal para dia a dia',
            imageUrl: 'https://example.com/mochila.jpg',
            price: 159.0
        }
    ]


    for (const item of items) {
        await prisma.product.create({ data: item })
    }


    console.log('Seed finished')
}


main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })