const {engage} = require('../twitter')
const {People} = require('../sharepoint')

const start = async () => {
  const person = (await People.get('ID eq 20'))[0]
  await engage(person.twitter_access_token, person.twitter_access_token_secret, person.twitter)
}

start()
