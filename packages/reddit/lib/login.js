const snoowrap = require('snoowrap')
const {Apps} = require('../../sharepoint')

const login = async (username, password) => {
  const app = await Apps.get('reddit')
  const auth = {
    userAgent: 'GitBit',
    clientId: app.client_id,
    clientSecret: app.client_secret,
    username,
    password
  }

  const r = new snoowrap(auth)

  return r
}

module.exports = {login}
