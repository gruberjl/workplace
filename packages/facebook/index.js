const {login} = require('./lib/login')
const {sendFriendRequests} = require('./lib/friends-requests')
const {postToGroup} = require('./lib/post-to-group')
const {signUp} = require('./lib/sign-up')

module.exports = {login, sendFriendRequests, postToGroup, signUp}
