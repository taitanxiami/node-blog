
const  handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { resolve } = require('path')
const { rejects } = require('assert')
const blog = require('./src/controller/blog')


 //处理post 数据

 const getPostData = (req) => {
     const promise = new Promise((resolve,reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }

        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return  
        }

        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end', ()=> {
            if(!postData) {
                resolve({})
                return  
            }
            resolve(JSON.parse(postData))
        })
     })
     return promise
 }

const server = (req, res) => {

    //返回json
    res.setHeader('Content-type','application/json')
   

    req.query = querystring.parse(req.url.split('?')[1])
    req.path = req.url.split('?')[0]  

    //处理postData
    getPostData(req).then(postData => {

        //这样处理路由的时候 都可以通过req.body 获取postData了
        req.body = postData
        const blogResult = handleBlogRouter(req,res)
         if(blogResult) {
             blogResult.then(list=> {
                res.end(JSON.stringify(list))
             })
             //防止往下走路由
             return
         }

        //登录路由
        const userdata = handleUserRouter(req,res)
        if(userdata) {
            res.end (
                JSON.stringify(userdata)
            )
            return
        }
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()

    })



}


module.exports = server
