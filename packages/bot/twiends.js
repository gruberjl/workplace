const {start} = require('../twiends/index')
const {twitterAccount} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const s = async () => {
  await start(twitterAccount.username, twitterAccount.password)
}

s()
