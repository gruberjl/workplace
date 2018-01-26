const Driver = require('driver')
var webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const twiendsLogin = async (email, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get('https://twiends.com/')
  await driver.findElement(By.className('txb')).click()

  const elEmail = driver.findElement(By.id('username_or_email'))
  const elPassword = driver.findElement(By.id('password'))
  await elEmail.sendKeys(email)
  await elPassword.sendKeys(password)
  await driver.findElement(By.id('allow')).click()
  await driver.sleep(2000)

  return driver
}

module.exports = {twiendsLogin}
