import express from 'express'
import prisma from '../prismaClient.js'


const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const marcas = await prisma.marca.findMany()
        res.json(marcas)
    } catch (error) {
        console.log(error)
    }
})

router.post('/create', async (req, res) => {
    const {
        nome
    } = req.body

    try {
        const marca = await prisma.marca.create({
        data: {
            nome
        }
    })
    console.log(marca)
    } catch(error) {
        console.log(error.message)
    }
})

router.put('/update/:id', async (req, res) => {
    const {
        nome
    } = req.body
    const { id } = req.params

    const newMarca = await prisma.marca.update({
        where: {
            id: parseInt(id),
        },
        data: {
            nome
        }
    })
    res.json(newMarca)
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    await prisma.marca.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.send({ message: 'Marca deletada.' })
})

export default router