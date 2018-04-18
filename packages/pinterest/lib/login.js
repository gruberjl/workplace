const Driver = require('../../driver')
const {By, Key} = Driver.webdriver
const url = 'https://www.pinterest.com/login/?referrer=home_page'

const login = async (email, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get(url)

  const elEmail = driver.findElement(By.id('email'))
  const elPassword = driver.findElement(By.id('password'))
  await elEmail.sendKeys(email)
  await elPassword.sendKeys(password)
  await elPassword.sendKeys(Key.RETURN)
  await driver.sleep(3000)

  return driver
}

module.exports = {login}
