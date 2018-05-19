const {login} = require('./login')
const user = require('./password')
const {listGet} = require('./list-get')
const {listPost} = require('./list-post')

const siteUrl = 'https://gitbit.sharepoint.com/sites/Marketing'
const listName = 'posts'

const get = async (title) => {
  const sp = await login(user.username, user.password)
  const list = await listGet(sp, siteUrl, listName)
  const apps = list

  if (title) {
    return apps.find((app) => app.Title == title)
  }
  return apps
}

const post = async (items) => {
  const sp = await login(user.username, user.password)

  const results = []
  for (let i = 0; i < items.length; i++) {
    results.push(await listPost(sp, siteUrl, 'Posts', items[i]))
  }

  return results
}

module.exports = {get, post}
