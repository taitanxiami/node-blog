
const {login}  = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res) => {

    const method = req.method
    const url = req.url

    if(method === 'POST' && url === "/api/user/login") {

        const {username, password} = req.body
        const result = login(username,password)

        return result.then(user => {
            console.log(user)
            if(user.username) {
                return new SuccessModel()
            }else {
                return new ErrorModel('登录失败')
            }
        })
        

    }
 }

 module.exports =  handleUserRouter