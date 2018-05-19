const {login} = require('./login')
const user = require('./password')
const {listGet} = require('./list-get')
const {listPost} = require('./list-post')
const {listUpdate} = require('./list-update')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

const siteUrl = 'https://gitbit.sharepoint.com/sites/Marketing'
const listName = 'posts'

const get = async (affix='') => {
  const sp = await login(user.username, user.password)
  const list = await listGet(sp, siteUrl, listName, affix)

  list.forEach((post) => {
    if (post.summary) {
      post.summary = entities.decode(post.summary.substring(post.summary.indexOf('>')+1, post.summary.length-6))
    }
  })

  return list
}

const post = async (items) => {
  const sp = await login(user.username, user.password)

  const results = []
  for (let i = 0; i < items.length; i++) {
    results.push(await listPost(sp, siteUrl, 'Posts', items[i]))
  }

  return results
}

const update = async (id, item) => await listUpdate('posts', id, item)

module.exports = {get, post, update}
