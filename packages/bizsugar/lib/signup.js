const Driver = require('../../driver')
const {By} = Driver.webdriver

const signup = async (username, password, email) => {
  const driver = await Driver.build()
  await driver.get('https://www.bizsugar.com/')

  await driver.findElement(By.css('.register a')).click()
  await driver.sleep(1000)

  const elConfPass = await driver.findElement(By.id('reg_verify'))
  await elConfPass.sendKeys(password)
  await driver.sleep(500)

  const elPass = await driver.findElement(By.id('reg_password'))
  await elPass.sendKeys(password)
  await driver.sleep(500)

  const elEmail = await driver.findElement(By.id('reg_email'))
  await elEmail.sendKeys(email)
  await driver.sleep(500)

  const elUser = await driver.findElement(By.id('reg_username'))
  await elUser.sendKeys(username)
  await driver.sleep(500)

  const submitBtn = await driver.findElement(By.name('submit'))
  await submitBtn.click()
  await driver.sleep(3000)

  return driver
}

module.exports = {signup}
