const Twit = require('twit')

const getTweets = async (T, screen_name, count = 25) => new Promise((res, rej) => {
  T.get('statuses/user_timeline', { screen_name, count, exclude_replies: true, include_rts: true }, function(err, data) {
    if (err)
      rej(err)
    else {
      const tweets = data.filter((tweet) => {
        return (
          tweet.favorited == false &&
          tweet.retweeted == false
        )
      })
      res(tweets)
    }
  })
})

const favoriteTweet = async (T, ID) => new Promise((res, rej) => {
  const id = String(ID)
  T.post('favorites/create', { id }, (err, data) => {
    if (err && err.code != 139)
      rej(err)
    else
      res(data)
  })
})

const retweet = (T, ID) => new Promise((res, rej) => {
  const id = String(ID)
  T.post('statuses/retweet/:id', { id }, function (err, data) {
    err ? rej(err) : res(data)
  })
})

const isRetweet = (tweet) => Boolean(tweet.retweeted_status)

const loyalist = async (user, leaderUsername = 'gruberjl') => {
  console.log(`${user.username} @${leaderUsername}`)
  var T = new Twit(user)
  const tweets = await getTweets(T, leaderUsername)
  console.log(`Found ${tweets.length} tweets`)

  for (const tweet of tweets) {
    if (isRetweet(tweet)) {
      await favoriteTweet(T, tweet.id_str)
    } else {
      await retweet(T, tweet.id_str)
    }
  }
}

module.exports = {loyalist}
