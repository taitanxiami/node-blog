const {exec} = require('../db/mysql')

const getList = (author,keyword) => {

    let sql = `select * from blogs where 1=1 `

    if(author) {
        sql += `and author = '${author}' `
    }

    if(keyword) {
        sql += `and title like '%${keyword}% '`
    }

    sql += `order by createtime desc;`
    return exec(sql)
    
}

const getDetail = (id)=> {
   let sql = `select * from blogs where id = ${id}`
//    return exec(sql)
return exec(sql).then(rows=> {
    return rows[0] || {}
})
}

const newBlog = (blogData = {}) => {
     //blogData 包含title content 数据     
     let time = Date.now()
     let sql = `insert into blogs (title,content,createtime,author) VALUES ('${blogData.title}','${blogData.content}','${time}','${blogData.author}')`
     return exec(sql)
}

const updateBlog = (id,blogData) => {
    //blogData 包含title content 数据
    //id 博客id    
    let sql = `UPDATE blogs SET `
    // serialno = '20170319010010' , name = '名字10'  WHERE id = 10;
    if(blogData.title) {
        sql += `title = '${blogData.title}'`
    }
    if(blogData.content) {
        sql += `, content = '${blogData.content}' `
    }
    sql += `where id = ${id}`
    return exec(sql).then(blog=> {
        if(blog.affectedRows  > 0) {
            return true
        }
        return  false        
    })
  
}
const delBlog = (id,author) => {
    //id 博客id
    let sql = `DELETE FROM blogs WHERE id = ${id} and author = '${author}'`
    console.log(sql);
    return exec(sql).then(blog=> {
        console.log(blog);
        if(blog.affectedRows  > 0) {
            return true
        }
        return  false        
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}