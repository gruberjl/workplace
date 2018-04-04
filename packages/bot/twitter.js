const {engage} = require('../twitter')
const {twitterAccount, twitterApp} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const start = async () => {
  await engage(Object.assign({}, twitterAccount, twitterApp))
}
start()
