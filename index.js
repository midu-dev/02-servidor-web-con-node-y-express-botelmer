const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  const processRequest = (req, res) => {
    const { method, url } = req
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    let incorrectMethod = false;
    switch (url) {
      case '/':
        if (method !== 'GET') { incorrectMethod = true; break }
        return res.end('<h1>¡Hola mundo!</h1>')
      case '/logo.webp':{
        if (method !== 'GET') { incorrectMethod = true; break }

        const pathImg = path.join('assets', 'logo.webp')
        res.setHeader('Content-Type', 'image/webp')

        fs.readFile(pathImg, (err, data) => {
          if(err) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.statusCode = 500
            return res.end('<h1>500 Internal Server Error</h1>')
          }
          return res.end(data)
        })
        break
      }
      case '/404':
        if (method !== 'GET') { incorrectMethod = true; break }
        res.statusCode = 404
        return res.end('<h1>404</h1>')
      case '/contacto':{
        if (method !== 'POST') { incorrectMethod = true; break }

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
        res.statusCode = 404
        return res.end('<h1>404</h1>')
    }
    if(incorrectMethod){
      res.statusCode = 405
      return res.end('<h1>405 Method Not Allowed</h1>')
    }
  }

  const PORT = process.env.PORT ?? 1234
  const server = http.createServer(processRequest)
  return server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

module.exports = {
  startServer
}
