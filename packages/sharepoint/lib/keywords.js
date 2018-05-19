const {login} = require('./login')
const user = require('./password')
const {listGet} = require('./list-get')

const siteUrl = 'https://gitbit.sharepoint.com/sites/Marketing'
const listName = 'keywords'

const get = async () => {
  const sp = await login(user.username, user.password)
  const list = await listGet(sp, siteUrl, listName)
  return list
}

module.exports = {get}
