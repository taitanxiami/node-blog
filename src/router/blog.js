
const { 
    getList ,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel }  = require('../model/resModel');
const handleBlogRouter = (req,res) => {

     const method = req.method;
     const path =  req.path    
     const id = req.query.id


     if(method === 'GET' && path === '/api/blog/list') {
        const authod = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result =   getList(authod,keyword)
       return  result.then(list => {
        console.log(list)
            return new SuccessModel(list)
        })

         
     }

     if(method === 'GET' && path === '/api/blog/detail') {
     
            const result = getDetail(id)
            return result.then(detail => {
                console.log(detail)
                return new SuccessModel(detail) 
            }).catch(err => {
                return  new ErrorModel(err)
            })
               
       
    }
    if(method === 'POST' && path === '/api/blog/new') {
        const postData = req.body   
        return   newBlog(postData).then(blog => {
            console.log(blog)
            if(blog.affectedRows == 1) {
                return new SuccessModel({
                    insertId:blog.insertId
                })
            }else {
                return  new ErrorModel()
            }
         }).catch(err => {
            return  new ErrorModel(err)
        })                
    }
    if(method === 'POST' && path === '/api/blog/update') {
        const result  = updateBlog(id,req.body)
       
        return  result.then(val => {
            // console.log('val',val)
            if(val) {
                return new SuccessModel('更新成功')
            }else {
                return  new ErrorModel('更新失败')
            }
        }).catch(err => {
            return  new ErrorModel(err)
        })  
                        
    }

    if(method === 'POST' && path === '/api/blog/del') {

        const author = 'lisi'
        const result  = delBlog(id,author)                
        return  result.then(val => {            
            if(val) {
                return new SuccessModel('删除成功')
            }else {
                return  new ErrorModel('删除失败')
            }
        }).catch(err => {
            return  new ErrorModel(err)
        }) 
       
        
    }
}

module.exports = handleBlogRouter