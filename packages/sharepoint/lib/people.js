const {login} = require('./login')
const user = require('./password')
const {listGet} = require('./list-get')

const siteUrl = 'https://gitbit.sharepoint.com/sites/Marketing'
const listName = 'People'

const get = async (filter = '') => {
  const sp = await login(user.username, user.password)
  filter ? filter = `$filter=${filter}` : null
  const list = await listGet(sp, siteUrl, listName)
  return list
}

module.exports = {get}
