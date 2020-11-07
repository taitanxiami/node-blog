const crypto = require('crypto')

// 秘钥

const SECREY_KEY = 'Wkdol_9o0<'

// md5 加密

function md5(content) {

    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数

function getPassword(password) {

    const str = `password=${password}&key=${SECREY_KEY}`
    return md5(str)
}
const result = getPassword('123')
console.log(result);
module.exports = {
    getPassword
}