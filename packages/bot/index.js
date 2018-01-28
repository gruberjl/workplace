const Driver = require('../driver')
const twitter = require('../twitter')
const linkedin = require('../linkedin')
const password = require('./password')

const start = async () => {
  const email = 'gruberjl@gmail.com'
  const driver = await Driver.build()

  await twitter.twiendsLogin(email, password.gruber.twitter, driver)
  await twitter.twiendsFollow(driver)
  await driver.sleep(3000)

  await linkedin.login(email, password.gruber.linkedin, driver)
  await linkedin.connect(driver)
  await driver.sleep(3000)

  //await driver.sleep(3000)
  await driver.quit()
}

start()
