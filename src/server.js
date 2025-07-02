import express from 'express'
import marcaRoutes from './routes/marcaRoutes.js'
import veiculoRoutes from './routes/veiculoRoutes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api/veiculos', veiculoRoutes)
app.use('/api/marcas', marcaRoutes)

app.listen(port, () => {
    console.log(`Servidor na porta ${port}`)
})