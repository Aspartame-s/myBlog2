const http = require('http')
const PORT = 8000
const querystring = require('querystring')
const serverHandle = require('../app')
console.log('ok')
const server = http.createServer(serverHandle)
// const server = http.createServer((req, res) => {
//     // res.end('hello world')
//     const url = req.url
//     req.query = querystring.parse(url.split('?')[1])
//     console.log(req.method)
//     res.end(JSON.stringify(req.query))
// })
server.listen(PORT)
