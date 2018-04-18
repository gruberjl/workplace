const {engage} = require('../twitter')
const {twitterAccount, twitterApp, SharePoint} = require('../data')
const {login, listPost} = require('../sharepoint')
const {csv} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const start = async () => {
  const sp = login(SharePoint.username, SharePoint.password)
  const results = await engage(Object.assign({}, twitterAccount, twitterApp))
  await listPost(sp, 'https://gitbit.sharepoint.com/sites/Marketing', 'Twitter-Engage-Log', results)

  const people = await csv()
  for (let i = 0; i < people.length; i++) {
    if (people[i].twitter_token) {
      const person = {access_token: people[i].twitter_token, access_token_secret: people[i].twitter_secret, username: people[i].twitter}
      const results = await engage(Object.assign(person, twitterApp))
      await listPost(sp, 'https://gitbit.sharepoint.com/sites/Marketing', 'Twitter-Engage-Log', results)
    }
  }
}

start()
