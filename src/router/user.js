 const handleUserRouter = (req,res) => {

    const method = req.method
    const url = req.url

    if(method === 'POST' && url === "/api/user/login") {

        return {
            msg:"这是登录接口"
        }
    }
 }

 module.exports =  handleUserRouter