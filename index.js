import express from 'express'
import dotenv from "dotenv"
import connectDataBase from './src/database/db.js'
import cors from 'cors'

import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import postsRoute from './src/routes/posts.route.js'
import swaggerRoute from './src/routes/swagger.route.cjs'

dotenv.config()

const app = express()

app.use(cors())

const port = process.env.PORT || 3000

connectDataBase()
app.use(express.json())
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use("/posts", postsRoute)
app.use("/doc", swaggerRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
