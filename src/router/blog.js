const { getList, getDetail, createNewBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const blogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id
    if (method == 'GET' && path == '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData, '调用成功')
        const result = getList(author, keyword)
        return result.then(listData => {
            // console.log(listData)
            return new SuccessModel(listData)
        })
    }
    if (method == 'GET' && path == '/api/blog/detail') {
        // const id = req.query.id || ''
        const result = getDetail(id)
        return result.then(blogDetail => {
            return new SuccessModel(blogDetail)
        })
    }
    if (method == 'POST' && path == '/api/blog/new') {
        const blogData = req.body
        blogData.author = 'zhangsan' // 假数据 后期登陆接口做完替换
        blogData.createtime = Date.now()
        const data = createNewBlog(blogData)
        return data.then(result => {
            return new SuccessModel(result)
        })
    }
    if (method == 'POST' && path == '/api/blog/update') {
        const updateData = updateBlog(id, req.body)
        return updateData.then(result => {
            if (result) {
                return new SuccessModel(result)
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    if (method == 'POST' && path == '/api/blog/delete') {
        const author = 'zhangsanq'
        const delData = delBlog(id, author)
        return delData.then(result => {
            console.log(result)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
module.exports = blogRouter