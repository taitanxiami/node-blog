
const {login}  = require('../controller/user')
const {set} = require('../db/redis')

const { SuccessModel, ErrorModel } = require('../model/resModel')


// const getCookieExpires = () => {

//     const d = new Date()
//     d.setTime(d.getTime() + (12 * 60 * 60 * 1000))
//     return d.toGMTString()
// }

const handleUserRouter = (req,res) => {

    const method = req.method
    const url = req.url
  
    if(method === 'POST' && url === "/api/user/login") {
       
        const {username, password} = req.body
     
        const result = login(username,password)
    
        return result.then(user => {                       
            if(user.username) {
                //设置sesstion
                req.sesstion.username = user.username
                req.sesstion.realname = user.realname
                set(req.sesstionId,req.sesstion)
                console.log('req.sesstion is ', req.sesstion);
                return new SuccessModel()
            }else {
                return new ErrorModel('登录失败')
            }
        })        
    }
 }

 module.exports =  handleUserRouter