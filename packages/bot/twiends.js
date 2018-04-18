const {start} = require('../twiends/index')
const {twitterAccount} = require('../data')
// const {csv, commonPassword} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const s = async () => {
  await start(twitterAccount.username, twitterAccount.password)

  // const people = await csv()
  // for (let i = 0; i < people.length; i++) {
  //   if (people[i].twitter) {
  //     await start(people[i].twitter, commonPassword)
  //   }
  // }
}

s()
