const {loyalist} = require('../twitter')
const {csv, twitterApp} = require('../data')

const start = async () => {
  const people = await csv()

  for (let i = 0; i < people.length; i++) {
    if (people[i].twitter_token) {
      await loyalist(Object.assign(
        {username: people[i].twitter, access_token: people[i].twitter_token, access_token_secret: people[i].twitter_secret},
        twitterApp))
    }
  }
}

start()
