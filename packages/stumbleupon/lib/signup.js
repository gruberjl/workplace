const Driver = require('../../driver')
const {By} = Driver.webdriver

const url = 'https://www.stumbleupon.com/'

const setSelectMenu = async (driver, elementId, value) => {
  await driver.executeScript(
    'arguments[0].value = arguments[1]',
    driver.findElement(By.id(elementId)),
    value
  )
}

const signup = async (email, username, password, birthMonth, birthDay, birthYear, sex) => {
  const driver = await Driver.build()

  await driver.get(url)
  await driver.sleep(3000)
  await driver.findElement(By.className('expand-email-form')).click()
  await driver.sleep(1000)
  await driver.findElement(By.id('email')).sendKeys(email)
  await driver.findElement(By.id('username')).sendKeys(username)
  await driver.findElement(By.id('password-signup')).sendKeys(password)
  await setSelectMenu(driver, 'month', birthMonth)
  await setSelectMenu(driver, 'day', birthDay)
  await setSelectMenu(driver, 'year', birthYear)

  await driver.findElement(By.id(sex.toLowerCase())).click()

  return driver
}

module.exports = {signup}
