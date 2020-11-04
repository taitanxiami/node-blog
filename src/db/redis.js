const {REDIS_CONF} = require('../conf/db')

const redis = require('redis')

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)

redisClient.on('error',err => {
    console.log(err)
})

const set = (key,val) => {

    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}

const get = (key) => {

    const promise = new Promise((resolve,reject) => {
        redisClient.get(key, (err,val) => {
            if(err) {
                reject(err)
                return
            }

            if(val == null) {
                resolve(null)
            }

            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
              
        })
    })

    return promise
}

module.exports = {
    get,
    set
}