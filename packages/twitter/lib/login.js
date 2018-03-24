const Driver = require('../../driver')
var webdriver = require('selenium-webdriver')
const {By, Key} = webdriver

const login = async (email, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get('https://twitter.com/login')

  const elPassword = await driver.findElement(By.name('session[password]'))
  const elEmail = await driver.findElement(By.name('session[username_or_email]'))
  await elPassword.sendKeys(password)
  await elEmail.sendKeys(email)
  await elEmail.sendKeys(Key.RETURN)
  await driver.sleep(3000)

  return driver
}

module.exports = {login}
