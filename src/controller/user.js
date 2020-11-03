const login = (username,password) => {

    if(username == 'daxiami' && password == '123') {
        return true
    }
    return false
}

module.exports = {
    login
}