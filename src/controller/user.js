const {exec,escape} = require('../db/mysql')
const {getPassword} = require('../utils/cryp')

const login = (username,password) => {

     username = escape(username)
     //加密
     password = getPassword(password)
     password = escape(password)

    let sql= `select username,realname from users where username = ${username} and password = ${password}`
    console.log(sql);
    return exec(sql).then(rows=> {
        return rows[0] || {}
    })
}

module.exports = {
    login
}