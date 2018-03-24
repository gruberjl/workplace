var Twit = require('twit')
const {csv, twitterAccount, twitterApp} = require('../data')

const friends = []

process.on('unhandledRejection', r => console.log(r))

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

const engagementCycle = async (user, hashtag) => {
  console.log(`starting engagement cycle for @${user.twitter} #${hashtag}`)
  var T = new Twit(user)
  const tweets = await getTweets(T, hashtag)
  console.log(`     Found ${tweets.length} tweets`)
  for (const tweet of tweets) {
    if (validateTweet(tweet, false)) {
      await favoriteTweet(T, tweet.id_str)
    }
    await engageUser(T, tweet.user.screen_name)
  }
  console.log('ending engagement cycle')
}

const start = async () => {
  const tags = ['MicrosoftTeams', 'sharepoint', 'office2016', 'office365', 'exchangeonline', 'microsoftflow', 'onedrive']
  const people = await csv()
  // await engagementCycle(Object.assign({}, twitterApp, twitterAccount), tags[Math.floor(Math.random()*tags.length)])

  for (let i = 0; i < people.length; i++) {
    if (people[i].twitter_token) {
      const tag = tags[Math.floor(Math.random()*tags.length)]
      const person = Object.assign({
        twitter: people[i].twitter,
        access_token: people[i].twitter_token,
        access_token_secret: people[i].twitter_secret
      }, twitterApp)

      await engagementCycle(person, tag)
    }
  }
}

start()
