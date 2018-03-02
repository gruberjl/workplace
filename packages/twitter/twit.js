/* eslint no-unused-vars: 0 */
var Twit = require('twit')
const debugEngage = require('debug')('engage')
const debugFollow = require('debug')('engage:follow')
const debugFav = require('debug')('engage:favorite')
const pass = require('./password')
const friends = []
let foundMyself = false
const HASH_TAG = 'office365'

var T = new Twit(pass)

const getTweets = async (count = 10) => new Promise((res, rej) => {
  T.get('search/tweets', { q: `#${HASH_TAG} since:2018-01-01 lang:en`, count }, function(err, data) {
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

const getUserTweets = async (screen_name, count = 3) => new Promise((res, rej) => {
  T.get('statuses/user_timeline', { screen_name, count }, (err, data) => {
    if (err)
      rej(err)
    else {
      res(data)
    }
  })
})

const favoriteTweet = async (ID) => new Promise((res, rej) => {
  const id = String(ID)
  T.post('favorites/create', { id }, (err, data) => {
    if (err && err.code != 139)
      rej(err)

    res(data)
  })
})

const follow = async (screen_name) => new Promise((res, rej) => {
  debugFollow(`Executing follow API for: ${screen_name}`)
  T.post('friendships/create', { screen_name }, (err, data) => {
    if (err) {
      debugFollow(`Error attempting to follow ${screen_name}: %O`, err)
      rej(err)
    } else {
      res(data)
    }
  })
})

const validateTweet = (tweet, favorited) => (
  tweet.possibly_sensitive != true &&
  tweet.lang == 'en' &&
  tweet.user.lang == 'en' &&
  (typeof favorited === 'undefined' ? true : favorited === tweet.favorited)
)

const engageUser = async (screen_name) => new Promise(async (res, rej) => {
  debugEngage(`engageUser Started for ${screen_name}`)
  if (friends.includes(screen_name))
    return res()

  debugEngage(`Engaging: ${screen_name}`)
  await follow(screen_name)
  // const tweets = await getUserTweets(screen_name)
  // for (const tweet of tweets) {
  //   if (validateTweet(tweet, false)) {
  //     await favoriteTweet(tweet.id_str)
  //   }
  // }
  friends.push(screen_name)
  res()
})

const engageRetweeters = async (tweet) => new Promise(async (res, rej) => {
  if (tweet.retweet_count == 0) {
    return res()
  }

  T.get(`statuses/retweets/${tweet.id_str}`, async (err, data) => {
    if (err)
      rej(err)
    else {
      for (const retweet of data) {
        await engageUser(retweet.user.screen_name)
      }
      res()
    }
  })
})

const getTweet = async (id) => new Promise((res, rej) => {
  T.get(`statuses/show/${id}`, (err, data) => {
    if (err)
      rej(err)
    else {
      res(data)
    }
  })
})

const getMyself = async () => new Promise((res, rej) => {
  if (foundMyself)
    return res()

  friends.push('gruberjl')
  foundMyself = true
})

const engagementCycle = async () => {
  console.log('starting engagement cycle')
  const tweets = await getTweets(100)
  for (const tweet of tweets) {
    if (validateTweet(tweet, false)) {
      await favoriteTweet(tweet.id_str)
    }
    await engageUser(tweet.user.screen_name)
    // await engageRetweeters(tweet)
  }
  console.log('ending engagement cycle')
}

const start = async () => {
  const MINUTE = 60000
  await engagementCycle
  setInterval(await engagementCycle, MINUTE * 15)
}

// start()
engagementCycle()
