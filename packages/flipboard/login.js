var webdriver = require('selenium-webdriver')
const {By, Key} = webdriver
const Driver = require('../driver')

const login = async (email, password) => {
  const driver = await Driver.build()
  await driver.get('https://flipboard.com/')

  const loginBtn = await driver.findElement(By.css('.login-button'))
  await loginBtn.click()
  await driver.sleep(1000)

  const elPass = await driver.findElement(By.css('.login-form input[data-testid="sign-in-password"]'))
  await elPass.sendKeys(password)
  await driver.sleep(500)

  const elEmail = await driver.findElement(By.css('.login-form input[data-testid="sign-in-username"]'))
  await elEmail.sendKeys(email)
  await driver.sleep(500)
  await elEmail.sendKeys(Key.TAB)
  await driver.sleep(500)
  await elEmail.sendKeys(Key.ENTER)
  await driver.sleep(7000)

  return driver
}

const getUsername = async (driver) => {
  await driver.get('https://flipboard.com/profile')
  const text = await driver.findElement(By.css('.logged-in-as')).getText()
  const username = text.split(' ')[3]
  return username
}

module.exports = {login, getUsername}
