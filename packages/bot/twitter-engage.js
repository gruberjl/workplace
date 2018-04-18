const {engage} = require('../twitter')
const {twitterAccount, twitterApp, SharePoint} = require('../data')
const {login, listPost} = require('../sharepoint')

process.on('unhandledRejection', r => console.log(r))

const start = async () => {
  const sp = login(SharePoint.username, SharePoint.password)
  const results = await engage(Object.assign({}, twitterAccount, twitterApp))
  await listPost(sp, 'https://gitbit.sharepoint.com/sites/Marketing', 'Twitter-Engage-Log', results)
}

start()
