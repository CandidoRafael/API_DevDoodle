import express from 'express'
import connectDataBase from './src/database/db.js'
import dotenv from "dotenv"

import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import postsRoute from './src/routes/posts.route.js'


dotenv.config()

const app = express()
const port = process.env.PORT || 3000

connectDataBase()
app.use(express.json())
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use("/posts", postsRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// ROTAS
// Method HTTP
// Get - PEga info
// POST - Cria uma info
// PUT - Altera toda a info
// PATCH - Altera parte da info
// DELETE - Apaga uma info