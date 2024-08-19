const express = require('express')
const app = express()
const fs = require('node:fs')

// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  app.disable('x-powered-by')

  app.use(express.static('assets'))
  app.use(express.json())

  app.all('/', (req, res) => {
    if (req.method === 'GET') return res.send('<h1>¡Hola mundo!</h1>')

    res.status(405).send('<h1>405 Method Not Allowed</h1>')
  })

  app.get('/logo.webp', (req, res) => {
    fs.readFile('logo.webp', (err, data) => {
      if(err) {
        res.statusCode = 500
        return res.end('<h1>500 Internal Server Error</h1>')
      }
      return res.send(data)
    })
  })

  app.get('/404', (req, res) => {
    res.status(404).send('<h1>404</h1>')
  })

  app.all('/contacto', (req, res) => {
    if (req.method === 'POST') return res.status(201).json(req.body)

    res.status(405).send('<h1>405 Method Not Allowed</h1>')
  })

  app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
  })

  const PORT = process.env.PORT ?? 1234
  return app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

module.exports = {
  startServer
}
