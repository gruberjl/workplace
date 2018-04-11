const {login} = require('./lib/login')
const {connect} = require('./connect')
const {postToGroup} = require('./post-to-group')
const {getCompany} = require('./lib/get-company')
const {connectTo} = require('./lib/connect-to')

module.exports = {login, connect, postToGroup, getCompany, connectTo}
