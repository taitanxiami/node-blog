
const {login}  = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res) => {

    const method = req.method
    const url = req.url

    if(method === 'POST' && url === "/api/user/login") {

        const {username, password} = req.body
        console.log(req.body)
        const result = login(username,password)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel()
        }

    }
 }

 module.exports =  handleUserRouter