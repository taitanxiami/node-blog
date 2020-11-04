
const {login}  = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req,res) => {

    const method = req.method
    const url = req.url

    if(method === 'POST' && url === "/api/user/login") {

        const {username, password} = req.body
        // console.log(req.body)
        const result = login(username,password)

        return result.then(data => {
            console.log(data)
            if(data.length > 0) {
                console.log(111);
                return new SuccessModel()
            }else {
                console.log(222);

                return new ErrorModel()
            }
        })
        

    }
 }

 module.exports =  handleUserRouter