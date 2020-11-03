
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
            if(blog.affectedRows == 1) {
                return new SuccessModel()
            }else {
                new ErrorModel()
            }
         }).catch(err => {
            return  new ErrorModel(err)
        })
        
        
    }
    if(method === 'POST' && path === '/api/blog/update') {
        const result  = updateBlog(id,req.body)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel()
        }
        
    }

    if(method === 'POST' && path === '/api/blog/del') {
        const result  = delBlog(id)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel()
        }
        
    }
}

module.exports = handleBlogRouter