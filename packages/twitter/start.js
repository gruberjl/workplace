/* eslint no-unused-vars: 0 */
const {engage} = require('./index')
const {csv, commonPassword, twitterAccount, twitterApp} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const start = async () => {
  const people = await csv()
  await engage(Object.assign({}, twitterAccount, twitterApp))

  for (let i = 0; i < people.length; i++) {
    if (people[i].twitter_token) {
      await engage(Object.assign({access_token: people[i].twitter_token, access_token_secret: people[i].twitter_secret}, twitterApp))
    }
  }
}

start()
