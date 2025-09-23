import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'


dotenv.config()


const prisma = new PrismaClient()


async function main() {
    const products = [
        {
            title: 'Câmera de Segurança Wi‑Fi 1080p',
            description: 'Câmera externa resistente à água, visão noturna e detecção de movimento.',
            price: 249.90
        },
        {
            title: 'Sensor de Movimento PIR',
            description: 'Sensor para automação residencial, fácil integração com microcontroladores.',
            price: 39.5
        },
        {
            title: 'Roteador Mesh Dual Band',
            description: 'Cobertura estendida, até 3.0Gbps para redes domésticas.',
            price: 499.0
        },
        {
            title: 'Sensor de Umidade do Solo',
            description: 'Sensor analógico para monitoramento de plantas em jardins e hortas.',
            price: 14.75
        },
        {
            title: 'Placa de Desenvolvimento ESP32',
            description: 'Microcontrolador com Wi‑Fi e Bluetooth para projetos IoT.',
            price: 29.9
        }
    ]


    // Limpa tabela (opcional) e insere
    await prisma.product.deleteMany()


    for (const p of products) {
        // Prisma espera Decimal para o campo Decimal; passar number funciona, prisma converte.
        await prisma.product.create({ data: p })
    }


    console.log('Seed finalizada: inseridos', products.length, 'produtos')
}


main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })