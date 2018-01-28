const Driver = require('driver')
var webdriver = require('selenium-webdriver')
const {By} = webdriver
const url = 'https://www.linkedin.com/'

const login = async (email, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get(url)

  const elEmail = driver.findElement(By.id('login-email'))
  const elPassword = driver.findElement(By.id('login-password'))
  await elEmail.sendKeys(email)
  await elPassword.sendKeys(password)
  await driver.findElement(By.id('login-submit')).click()
  await driver.sleep(2000)

  return driver
}

module.exports = {login}
