const {login} = require('./lib/login')
const {sendFriendRequests} = require('./lib/friends-requests')
const {postToGroup} = require('./lib/post-to-group')

module.exports = {login, sendFriendRequests, postToGroup}
