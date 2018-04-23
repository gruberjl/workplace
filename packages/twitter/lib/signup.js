const Driver = require('../../driver')
const {By, Key} = Driver.webdriver

const url = 'https://twitter.com/signup'

const signup = async (name, email, username, password) => {
  const driver = await Driver.build()

  await driver.get(url)
  await driver.sleep(1000)
  const nameField = driver.findElement(By.id('full-name'))
  await nameField.sendKeys(name)
  const emailField = driver.findElement(By.id('email'))
  await emailField.sendKeys(email)
  const passwordField = driver.findElement(By.id('password'))
  await passwordField.sendKeys(password)
  const cookieField = driver.findElement(By.className('use-cookie-personalization-field'))
  await cookieField.click()
  const submitButton = driver.findElement(By.id('submit_button'))
  await submitButton.click()
  await driver.sleep(5000)

  const skipLink = driver.findElement(By.className('skip-link'))
  await skipLink.click()
  await driver.sleep(5000)

  const usernameField = driver.findElement(By.id('username'))
  await usernameField.sendKeys(username)
  await driver.sleep(5000)
  const usernameSubmitButton = driver.findElement(By.id('submit_button'))
  await usernameSubmitButton.click()
  await driver.sleep(5000)

  await driver.get('https://twitter.com/')

  return driver
}

module.exports = {signup}
