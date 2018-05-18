const {login} = require('./lib/login')
const {listPost} = require('./lib/list-post')
const {listGet} = require('./lib/list-get')
const People = require('./lib/people')
const Apps = require('./lib/apps')
const Keywords = require('./lib/keywords')
const Posts = require('./lib/posts')

module.exports = {login, listPost, listGet, People, Apps, Keywords, Posts}
