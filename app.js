
const  handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const server = (req, res) => {

    //返回json
    res.setHeader('Content_type','application/json')


    // 博客路由
    const blogData = handleBlogRouter(req,res)
    console.log(blogData)
    if(blogData) {
        res.end(JSON.stringify(blogData))
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
}


module.exports = server
