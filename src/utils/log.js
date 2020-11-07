const fs=  require('fs')
const path = require("path")



// stream 
function creatWriteStream(fileName) {

    const fullFifleName = path.join(__dirname,'../../logs/',fileName)

    const opt = {
        flags:'a'
    }
    const writeStream = fs.createWriteStream(fullFifleName, opt)
    return writeStream
}

// 写日志
function writeLogs(writeStream,log) {
    writeStream.write(log +'\n')

}

const accessWriteStream = creatWriteStream('access.log')
 const access = (log) => {
    writeLogs(accessWriteStream,log)
 }

module.exports = {
    access
}