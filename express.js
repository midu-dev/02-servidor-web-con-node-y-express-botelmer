const express = require('express')
const app = express()
const fs = require('node:fs')

// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  app.disable('x-powered-by')

  app.use(express.static('assets'))
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('<h1>¡Hola mundo!</h1>')
  })

  app.get('/logo.webp', (req, res) => {
    const img = fs.readFileSync('logo.webp')
    res.send(img)
  })

  app.get('/404', (req, res) => {
    res.status(404).send('<h1>404</h1>')
  })

  app.post('/contacto', (req, res) => {
    const data = req.body
    res.status(201).json(data)
  })

  app.all('/', (req, res) => {
    res.status(405).send('<h1>405 Method Not Allowed</h1>')
  })

  app.all('/contacto', (req, res) => {
    res.status(405).send('<h1>405 Method Not Allowed</h1>')
  })

  const PORT = process.env.PORT ?? 1234
  const server = app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
  return server
}

module.exports = {
  startServer
}
