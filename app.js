const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')
const querystring = require('querystring')

const SESSION_DATA = {}

//用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => { //post传递参数是持续性的，数据来就会持续触发这个函数
            postData += chunk.toString()
        })
        req.on('end', () => { //这是数据传递结束
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
const serverHandle = (req, res) => {
    //设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    //获取path 
    const url = req.url
    req.path = url.split('?')[0]

    //获取query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookie = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3
    // console.log(req.headers)
    cookie.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        // console.log(key, value)
        req.cookie[key] = value
    })
    // console.log(req)

    //解析session
    let userId = req.cookie.userid //
    let needSetCookie = false
    if(userId) { //如果userId存在说已经通过接口传递了用户名跟密码，因为第一次请求接口此时服务器还只是将userId传递给客户端，并且必须请求login接口res才会set-header然后set-cookie，但第一次请求login此时的req.header里面的cookie还不存在userId
        if(!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    }else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    
    // if(userId) {
    //     if(!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // }else {
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
    // console.log(SESSION_DATA)
    // console.log(req.session)


    getPostData(req).then(postData => {
        req.body = postData
        const blogResult = blogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                // console.log(blogData, 'blogData')
                // console.log(blogResult, 'blogResult')
                res.end(JSON.stringify(blogData))
                // res.end(JSON.stringify(req.query.author))
            })
            return
        }
        const userResult = userRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }
        res.writeHead(404, { "Content-type": 'text/plain' })
        res.write("404 Not Found\n")
        res.end()
    })


}
module.exports = serverHandle