const {login} = require('./lib/twiends-login')
const {follow} = require('./lib/twiends-follow')

const start = async (username, password) => {
  if (!username || !password) throw ('username & password required')

  const driver = await login(username, password)
  await follow(driver)
  await driver.quit()
}

module.exports = {start}
