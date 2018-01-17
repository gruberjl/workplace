const Driver = require('driver')
var webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const login = async (driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get('http://medium.com')
  await driver.sleep(1000)
  await driver.findElement(By.css(`.js-signInButton`)).click()
  await driver.sleep(1000)
  await driver.findElement(By.css('.js-googleButton')).click()
  await driver.sleep(3000)
}

module.exports = {login}
