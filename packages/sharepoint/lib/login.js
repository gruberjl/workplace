const sprequest = require('sp-request')

const login = (username, password) => sprequest.create({username, password})

module.exports = {login}
