const Twit = require('twit')
const friends = []
const {Apps} = require('../../sharepoint')

const getTweets = async (T, hashtag, count = 100) => {
  const res = await T.get('search/tweets', { q: `#${hashtag} lang:en`, count })

  const tweets = res.data.statuses.filter((twit) => (
    twit.possibly_sensitive == false &&
    twit.lang == 'en' &&
    twit.user.lang == 'en'
  ))

  return tweets
}

const validateTweet = (tweet, favorited) => (
  tweet.possibly_sensitive != true &&
  tweet.lang == 'en' &&
  tweet.user.lang == 'en' &&
  (typeof favorited === 'undefined' ? true : favorited === tweet.favorited)
)

const follow = async (T, screen_name) => {
  await T.post('friendships/create', { screen_name })
}

const engageUser = async (T, screen_name) => {
  if (!friends.includes(screen_name)) {
    await follow(T, screen_name)
    friends.push(screen_name)
  }
}

const favoriteTweet = async (T, ID) => {
  const id = String(ID)
  await T.post('favorites/create', { id })
}

const engage = async (access_token, access_token_secret, username='') => {
  const app = await Apps.get('twitter')
  const tags = ['MicrosoftTeams', 'sharepoint', 'office2016', 'office365', 'exchangeonline', 'microsoftflow', 'onedrive', 'OfficeProPlus', 'SharePointOnline', 'MicrosoftPlanner']
  const hashtag = tags[Math.floor(Math.random()*tags.length)]

  var T = new Twit({
    consumer_key:app.client_id,
    consumer_secret:app.client_secret,
    access_token,
    access_token_secret
  })
  const tweets = await getTweets(T, hashtag)

  const validTweets = tweets.filter((tweet) => validateTweet(tweet, false))

  for (const tweet of validTweets) {
    if (Math.floor(Math.random()*3) == 0) {
      process.send(`${username} is liking tweet from @${tweet.user.screen_name}: "${tweet.text}"`)
      await favoriteTweet(T, tweet.id_str)
      await engageUser(T, tweet.user.screen_name)
    }
  }
}

module.exports = {engage}
