const Driver = require('../../driver')
const {By, Key} = Driver.webdriver
const url = 'https://www.tumblr.com/login'

const login = async (email, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get(url)

  const elEmail = driver.findElement(By.id('signup_determine_email'))
  await elEmail.sendKeys(email)
  await elPassword.sendKeys(Key.RETURN)

  const elPassword = driver.findElement(By.id('signup_password'))
  await elPassword.sendKeys(password)
  await elPassword.sendKeys(Key.RETURN)

  await driver.sleep(2000)

  return driver
}

module.exports = {login}
