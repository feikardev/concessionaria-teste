import express from 'express'
import prisma from '../prismaClient.js'


const router = express.Router()

router.get('/marca/:marcaId', async (req, res) => {
    const { marcaId } = req.params
    try {
        const veiculos = await prisma.veiculo.findMany({
            where: {
                marcaId: parseInt(marcaId)
            }
        })
        res.json(veiculos)
    } catch (error) {
        console.log(error)
    }
})

router.post('/create', async (req, res) => {
    const {
        modelo,
        status,
        marcaId
    } = req.body

    try {
        const veiculo = await prisma.veiculo.create({
        data: {
            modelo,
            status,
            marca: {
                connect: { id: marcaId }
            }
        }
    })
    console.log(veiculo)
    } catch(error) {
        console.log(error.message)
    }
})

router.put('/update/:id', async (req, res) => {
    const {
        modelo,
        status
    } = req.body
    const { id } = req.params

    const newVeiculo = await prisma.veiculo.update({
        where: {
            id: parseInt(id),
        },
        data: {
            modelo,
            status
        }
    })
    res.json(newVeiculo)
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    await prisma.veiculo.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.send({ message: 'Veículo deletado.' })
})

export default router