const {username, email} = require('./data')
const {signup} = require('./signup')

const signups = async () => {
  let i, driver
  for (i = 0; i < username.length; i++) {
    driver = await signup(username[i], 'PASS', email[i])
    await driver.quit()
  }
}

signups()
