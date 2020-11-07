
const  handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const {get ,set } = require('./src/db/redis')
const {nanoid} = require('nanoid')
const user = require('./src/controller/user')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (12 * 60 * 60 * 1000))
    return d.toGMTString()
}
// session 数据
// const SESSTION_DATA = {}

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


    //解析cooike 

    req.cookie = {}
    let cookieStr = req.headers.cookie || ''
    console.log('cookie is ' ,req.headers.cookie);
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        } 
       const arr = item.split('=')
       const key = arr[0].trim()
       const val = arr[1].trim()
       req.cookie[key] = val
    })
    console.log('req.cookie ',req.cookie);
    // 解析session
    let needSetCookie = false
    let userId  = req.cookie.userid
    console.log('userId',userId);

    //1. session 存到内存里

    // if(userId) {
    //     if(!SESSTION_DATA[userId]) {
    //         SESSTION_DATA[userId] = {}
    //     }
    // }else {
    //     console.log(2222);
    //     needSetCookie = true
    //     // userId = `${Date.now()}_${Math.random()}`
    //     // 生成id
    //     userId = nanoid()
    //     SESSTION_DATA[userId] = {}
    // }
    // req.sesstion = SESSTION_DATA[userId]

 

    // 2. session 存到redis 获取获取sesstion
    if(!userId) {
        needSetCookie = true
        userId = nanoid()
        set(userId,{})
    }
    req.sesstionId = userId;

    get(req.sesstionId).then(val => {
        if(val) {
            req.sesstion = val
        }else {
            set(req.sesstionId,{})
            req.sesstion = {}            
        }
     //处理postData
        return  getPostData(req)
    }).then(postData => {

        //这样处理路由的时候 都可以通过req.body 获取postData了
        req.body = postData
        const blogResult = handleBlogRouter(req,res)
         if(blogResult) {
             blogResult.then(list=> {
                if(needSetCookie) {
                    console.log(4444);
                    res.setHeader('Set-Cookie',`userid = ${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)    
                }
                res.end(JSON.stringify(list))
             })
             //防止往下走路由
             return
         }

        //登录路由
        const userdata = handleUserRouter(req,res)

     
        // console.log('userdata',userdata);
        if(userdata) {
            userdata.then(data => {
                
                if(needSetCookie) {
                    console.log(3333);
                    res.setHeader('Set-Cookie',`userid = ${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)    
                }
                res.end(JSON.stringify(data))
            })
            return
        }
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()

    })



}


module.exports = server
