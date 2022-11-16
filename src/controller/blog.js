const {exec} = require('../db/mysql')

//获取博客列表
const getList = (author, keyword) => {
   let sql = `select * from blogs where 1=1 `
   if(author) {
       sql += `and author='${author}' `
   }
   if(keyword) {
       sql += `and title like '%${keyword}%' `
   }
   sql += `order by createtime desc;`

   //返回promise
   return exec(sql)
}

//获取博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}' order by createtime desc`
    return exec(sql)
}


//新建博客
const createNewBlog = (blogData) => {
    let sql = `insert into blogs (title, content, createtime, author) values ('${blogData.title}', '${blogData.content}', '${blogData.createtime}', '${blogData.author}')`
   return exec(sql).then(data => {
       return {
           id: data.insertId
       }
   })
}
//更新博客
const updateBlog = (id,updateData) => {
    const newTitle = updateData.title
    const newContent = updateData.content
    let sql = `update blogs set title='${newTitle}', content='${newContent}' where id=${id}`
    
    return exec(sql).then(result => {
        if(result.affectedRows > 0) {
            return true
        }
        return false
    })
}
//删除博客
const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(result => {
        console.log(result)
        if(result.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    createNewBlog,
    updateBlog,
    delBlog
}