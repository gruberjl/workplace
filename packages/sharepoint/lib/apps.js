const {login} = require('./login')
const user = require('./password')
const {listGet} = require('./list-get')

const siteUrl = 'https://gitbit.sharepoint.com/sites/Marketing'
const listName = 'apps'

const get = async (title) => {
  const sp = await login(user.username, user.password)
  const list = await listGet(sp, siteUrl, listName)
  const apps = list

  if (title) {
    return apps.find((app) => app.Title == title)
  }
  return apps
}

module.exports = {get}
