const {friendsClean} = require('../twitter')
const {twitterAccount, twitterApp} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const start = async () => {
  friendsClean(Object.assign({}, twitterAccount, twitterApp))
}

start()
