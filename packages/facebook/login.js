const Driver = require('driver')
var webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const login = async (email, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get('https://www.facebook.com/')

  const elEmail = driver.findElement(By.id('email'))
  const elPassword = driver.findElement(By.id('pass'))
  await elEmail.sendKeys(email)
  await elPassword.sendKeys(password)

  await driver.findElement(By.css(`input[value="Log In"]`)).click()

  return driver
}

module.exports = {login}
