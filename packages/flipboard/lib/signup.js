const Driver = require('../../driver')
const {By, Key} = Driver.webdriver

const signup = async (username, password, email) => {
  const driver = await Driver.build()
  await driver.get('https://flipboard.com/')

  await driver.findElement(By.css('#front-door-banner button.button--primary')).click()
  await driver.sleep(1000)

  const elPass = await driver.findElement(By.css('.sign-up-form input[data-testid="sign-up-password"]'))
  await elPass.sendKeys(password)
  await driver.sleep(500)

  const elEmail = await driver.findElement(By.css('.sign-up-form input[data-testid="sign-up-email"]'))
  await elEmail.sendKeys(email)
  await driver.sleep(500)

  const elUser = await driver.findElement(By.css('.sign-up-form input[data-testid="sign-up-fullname"]'))
  await elUser.sendKeys(username)
  await elUser.sendKeys(Key.TAB)
  await driver.sleep(500)
  await elUser.sendKeys(Key.ENTER)
  await driver.sleep(7000)

  return driver
}

module.exports = {signup}
