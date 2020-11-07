
const { 
    getList ,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel }  = require('../model/resModel');

const loginCheck = (req) => {
    console.log(req.sesstion.username);
    if(!req.sesstion.username) {
        console.log(222);
        return Promise.resolve(new ErrorModel('尚未登录'))
    }

}
const handleBlogRouter = (req,res) => {

     const method = req.method;
     const path =  req.path    
     const id = req.query.id


     if(method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        //管理页面只能查询自己的博客
        if(req.query.isadmin) {

            const loginCheckResult = loginCheck(req)
            if(loginCheckResult) {
                //未登录
                return loginCheckResult
            }
            author = req.sesstion.username
        }
        const result =   getList(author,keyword)
       return  result.then(list => {
       
            return new SuccessModel(list)
        }).catch(err => {
            return  new ErrorModel(err)
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

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            //未登录
            return loginCheckResult
        }

        req.body.author = req.sesstion.username
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
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            //未登录
            return loginCheckResult
        }
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
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            //未登录
            return loginCheckResult
        }
        const author = req.sesstion.username        
        const result  = delBlog(id,author)                
        return  result.then(val => {     
            console.log('val',val);       
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