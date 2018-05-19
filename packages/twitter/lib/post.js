const Twit = require('twit')
const {Apps} = require('../../sharepoint')

const post = async (access_token, access_token_secret, status) => {
  const app = await Apps.get('twitter')
  const consumer_key = app.client_id
  const consumer_secret = app.client_secret
  const T = new Twit({consumer_key, consumer_secret, access_token, access_token_secret})
  return await T.post('statuses/update', {status})
}

module.exports = {post}
