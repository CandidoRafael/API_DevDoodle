const express = require('express')
const userRoute = require('./src/routes/user.route')

const app = express()

app.use('/soma', userRoute)

app.listen(3000);

// ROTAS
// Method HTTP
// Get - PEga info
// POST - Cria uma info
// PUT - Altera toda a info
// PATCH - Altera parte da info
// DELETE - Apaga uma info

// Name - Um identificador da rota

// Function - (callback)

// app.get('/home', (req, res) => {
//   const soma = 1 + 230

//   res.send({ soma })
// });
