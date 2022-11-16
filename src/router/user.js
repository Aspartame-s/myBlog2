const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//设置时间函数
const getCookieExpires = function() {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    // console.log(d.toGMTString())
    return d.toGMTString()
}

const userRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method == 'GET' && path == '/api/user/login') {
        // const {username, password} = req.body
        const {username, password} = req.query
        const result = login(username, password)
        return result.then(data => {
            if(data.username) {
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`) //写入cookie path=/ 在访问任何路由 都会带有这个cookie
                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
        // if(result) {
        //     return new SuccessModel()
        // }
        // return new ErrorModel("用户名或密码错误")
    }

    if(method == "GET" && path == '/api/user/login-test') {
        // console.log(req.cookie)
        if(req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }))
        }
        return Promise.resolve(new ErrorModel('请登录'))
    }
}
module.exports = userRouter
