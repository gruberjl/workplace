const {start} = require('./index')
const {csv, commonPassword, twitterAccount} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const s = async () => {
  const people = await csv()
  await start(twitterAccount.username, twitterAccount.password)

  for (let i = 0; i < people.length; i++) {
    if (people[i].twitter) {
      await start(people[i].email, commonPassword)
    }
  }
}

s()
