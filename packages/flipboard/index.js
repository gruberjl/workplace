const {login, getUsername} = require('./lib/login')
const {signup} = require('./lib/signup')
const {follow} = require('./lib/follow')
const {getMagazineFollowers} = require('./lib/get-magazine-followers')

module.exports = {login, getUsername, signup, follow, getMagazineFollowers}
