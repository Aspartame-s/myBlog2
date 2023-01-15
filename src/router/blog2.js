const { getList }= require('../controller/blog2')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method 
    const url = req.url
    const path = url.split('?')[0]

    //获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SuccessModel(listData)
    }

    //获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        return {
            msg: '这是获取博客详情接口'
        }
    }
    
     //新建博客
     if(method === 'POST' && path === '/api/blog/new') {
        return {
            msg: '这是新建博客接口'
        }
    }

     //更新博客
     if(method === 'POST' && path === '/api/blog/update') {
        return {
            msg: '这是更新博客接口'
        }
    }
}

module.exports = handleBlogRouter