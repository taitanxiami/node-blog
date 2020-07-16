
const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel }  = require('../model/resModel');
const handleBlogRouter = (req,res) => {

     const method = req.method;
     const path=  req.path
    //  console.log(path)
     if(method === 'GET' && path === '/api/blog/list') {
        const authod = req.query.author || ''
        const keyword = req.query.keyword || ''
        const list =   getList(authod,keyword)
         return new SuccessModel(list)
     }

     if(method === 'GET' && path === '/api/blog/detail') {
        return {
            msg:'这是博客详情接口'
        }
    }
    if(method === 'POST' && path === '/api/blog/new') {
        return {
            msg:'这是新建博客接口'
        }
    }
    if(method === 'POST' && path === '/api/blog/update') {
        return {
            msg:'这是博客更新接口'
        }
    }
}

module.exports = handleBlogRouter