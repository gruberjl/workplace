const {login} = require('./lib/login')
const {listPost} = require('./lib/list-post')
const {listGet} = require('./lib/list-get')
const people = require('./lib/people')
const apps = require('./lib/apps')

module.exports = {login, listPost, listGet, apps}
