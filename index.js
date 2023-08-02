const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
      case 'GET': {
        switch (url) {
          case '/':
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            return res.end('<h1>¡Hola mundo!</h1>')

          case '/logo.webp':{
            const pathImg = path.join('assets', 'logo.webp')
            res.setHeader('Content-Type', 'image/webp')
            const img = fs.readFileSync(pathImg, '')
            return res.end(img)
          }
          case '/404':
            res.statusCode = 404
            return res.end('<h1>404</h1>')

          default:
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            return res.end('<h1>404</h1>')
        }
      }

      case 'POST':
        switch (url) {
          case '/contacto':{
            let body = ''

            req.on('data', (chunk) => {
              body += chunk.toString()
            })

            req.on('end', () => {
              const data = JSON.parse(body)
              res.writeHead(201, {
                'Content-Type': 'application/json; charset=utf-8'
              })
              return res.end(JSON.stringify(data))
            })

            break
          }
          default:
            res.statusCode = 405
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            return res.end('<h1>405</h1>')
        }
        break

      default:
        res.statusCode = 405
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        return res.end('<h1>Método no soportado</h1>')
    }
  }

  const PORT = process.env.PORT ?? 1234
  const server = http.createServer(processRequest)
  server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
  return server
}

module.exports = {
  startServer
}
