
const {login}  = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const getCookieExpires = () => {

    const d = new Date()
    d.setTime(d.getTime() + (12 * 60 * 60 * 1000))
    return d.toGMTString()
}
const handleUserRouter = (req,res) => {

    const method = req.methods
    const url = req.url

    if(method === 'POST' && url === "/api/user/login") {

        const {username, password} = req.body
        const result = login(username,password)

        return result.then(user => {
            console.log(user)
            if(user.username) {
                res.setHeader('Set-Cookie',`usernamne = ${user.username}; paths=/; httpOnly; expires=${getCookieExpires()}`) 
                return new SuccessModel()
            }else {
                return new ErrorModel('登录失败')
            }
        })
        

    }
 }

 module.exports =  handleUserRouter