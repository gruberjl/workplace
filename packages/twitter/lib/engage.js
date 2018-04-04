const Twit = require('twit')
const friends = []

const getTweets = async (T, hashtag, count = 100) => new Promise((res, rej) => {
  T.get('search/tweets', { q: `#${hashtag} lang:en`, count }, function(err, data) {
    if (err)
      rej(err)
    else {
      const tweets = data.statuses.filter((twit) => {
        return (
          twit.possibly_sensitive == false &&
          twit.lang == 'en' &&
          twit.user.lang == 'en'
        )
      })

      res(tweets)
    }
  })
})

const validateTweet = (tweet, favorited) => (
  tweet.possibly_sensitive != true &&
  tweet.lang == 'en' &&
  tweet.user.lang == 'en' &&
  (typeof favorited === 'undefined' ? true : favorited === tweet.favorited)
)

const follow = async (T, screen_name) => new Promise((res, rej) => {
  T.post('friendships/create', { screen_name }, (err, data) => {
    if (err && err.code != 158) {
      rej(err)
    } else {
      res(data)
    }
  })
})

const engageUser = async (T, screen_name) => new Promise(async (res) => {
  if (friends.includes(screen_name))
    return res()

  await follow(T, screen_name)

  friends.push(screen_name)
  res()
})

const favoriteTweet = async (T, ID) => new Promise((res, rej) => {
  const id = String(ID)
  T.post('favorites/create', { id }, (err, data) => {
    if (err && err.code != 139)
      rej(err)

    res(data)
  })
})

const engage = async (user, hashtag) => {
  const tags = ['MicrosoftTeams', 'sharepoint', 'office2016', 'office365', 'exchangeonline', 'microsoftflow', 'onedrive', 'OfficeProPlus', 'SharePointOnline']
  if (!hashtag) hashtag = tags[Math.floor(Math.random()*tags.length)]

  console.log(`${user.username} #${hashtag}`)
  var T = new Twit(user)
  const tweets = await getTweets(T, hashtag)
  console.log(`Found ${tweets.length} tweets`)

  const validTweets = tweets.filter((tweet) => validateTweet(tweet, false))
  console.log(`${validTweets.length} valid tweets`)

  for (const tweet of validTweets) {
    await favoriteTweet(T, tweet.id_str)
    await engageUser(T, tweet.user.screen_name)
  }
}

module.exports = {engage}
