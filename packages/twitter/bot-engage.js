var Twit = require('twit')
const users = require('./password')

const friends = []
const HASH_TAG = 'excel'

process.on('unhandledRejection', r => console.log(r));

const getTweets = async (T, hashtag = HASH_TAG, count = 10) => new Promise((res, rej) => {
  T.get('search/tweets', { q: `#${hashtag} since:2018-01-01 lang:en`, count }, function(err, data) {
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

const engagementCycle = async (user, hashtag = HASH_TAG) => {
  console.log('starting engagement cycle')
  var T = new Twit(user)
  const tweets = await getTweets(T, hashtag, 100)
  for (const tweet of tweets) {
    if (validateTweet(tweet, false)) {
      await favoriteTweet(T, tweet.id_str)
    }
    await engageUser(T, tweet.user.screen_name)
  }
  console.log('ending engagement cycle')
}

const start = async () => {
  const tags = ['office365', 'MicrosoftTeams', 'sharepoint', 'exchangeonline', 'office2016']
  for (let i = 0; i < users.length; i++) {
    await engagementCycle(users[i], tags[Math.floor(Math.random()*tags.length)])
  }
}

start()
