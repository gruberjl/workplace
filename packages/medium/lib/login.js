const {By} = require('../../driver').webdriver

const login = async (driver) => {
  await driver.get('http://medium.com')
  await driver.sleep(1000)
  await driver.findElement(By.css('.js-signInButton')).click()
  await driver.sleep(1000)
  await driver.findElement(By.css('.js-googleButton')).click()
  await driver.sleep(3000)

  return driver
}

module.exports = {login}
