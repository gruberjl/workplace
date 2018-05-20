const {login} = require('./lib/login')
const {submitLink} = require('./lib/submit-link')
const user = require('./lib/user')
const {browseSubreddit} = require('./lib/browse-subreddit')
const {upvoteFriends} = require('./lib/upvote-friends')

module.exports = {login, submitLink, user, browseSubreddit, upvoteFriends}
