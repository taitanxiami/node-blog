const {exec} = require('../db/mysql')

const getList = (author,keyword) => {

    let sql = `select * from blogs where 1=1 `

    if(author) {
        sql += `and author = ${author} `
    }

    if(keyword) {
        sql += `and title like '%${keyword}% '`
    }

    sql += `order by createtime desc;`
    return exec(sql)
    
}

const getDetail = (id)=> {
   let sql = `select * from blogs where id = ${id}`
   return exec(sql)
}

const newBlog = (blogData = {}) => {
     //blogData 包含title content 数据
     return {
        id:3
    }
}

const updateBlog = (id,blogData) => {
    //blogData 包含title content 数据
    //id 博客id
    if(!id) {
        return false
    }
    return true
}
const delBlog = (id) => {
    //id 博客id
    if(!id) {
        return false
    }
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}