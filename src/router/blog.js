
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
        const list =   getList(authod,keyword)
         return new SuccessModel(list)
     }

     if(method === 'GET' && path === '/api/blog/detail') {
        
        if(id) {
            const detail = getDetail(id)
            return new SuccessModel(detail)    
        }else {
            return new ErrorModel('缺少id')
        }
    }
    if(method === 'POST' && path === '/api/blog/new') {

        const postData = req.body        
        return new SuccessModel(newBlog(postData))
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