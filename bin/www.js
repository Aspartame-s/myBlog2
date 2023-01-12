const http = require('http')
const PORT = 8000
const querystring = require('querystring')
const serverHandle = require('../app')
console.log('ok')
const server = http.createServer(serverHandle)
// const server = http.createServer((req, res) => {
//     // res.end('hello world')
//     if (req.method === 'GET') {
//         const url = req.url
//         req.query = querystring.parse(url.split('?')[1])
//         console.log(req.method)
//         res.end(JSON.stringify(req.query))
//     }else if(req.method === 'POST') {
//         console.log('content-type', req.headers['content-type'])
//         let postData = ''
//         req.on('data', (chunk) => {
//             postData += chunk.toString()
//         })
//         req.on('end', () => {
//             console.log(postData)
//             res.end('hello world') //在这里返回，因为是异步
//         })
//     }

// })
server.listen(PORT)
