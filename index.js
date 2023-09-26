import express from 'express'
import connectDataBase from './src/database/db.js'
import userRoute from './src/routes/user.route.js'

const app = express()
const port = 3000

connectDataBase()
app.use(express.json())
app.use('/user', userRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// ROTAS
// Method HTTP
// Get - PEga info
// POST - Cria uma info
// PUT - Altera toda a info
// PATCH - Altera parte da info
// DELETE - Apaga uma info
