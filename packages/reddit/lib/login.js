const url = 'https://www.reddit.com'
const Driver = require('../../driver')
const {By, Key} = Driver.webdriver

const login = async (username, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get(url)
  await driver.sleep(1000)

  const usernameEl = await driver.findElement(By.name('user'))
  await usernameEl.sendKeys(username)
  const elPassword = driver.findElement(By.name('passwd'))
  await elPassword.sendKeys(password)
  await elPassword.sendKeys(Key.RETURN)

  // const usernameEls1 = await driver.findElements(By.id('user_login'))
  // if (usernameEls1.length == 1) {
  //   await usernameEls1[0].sendKeys(username)
  //   const elPassword = driver.findElement(By.id('passwd_login'))
  //   await elPassword.sendKeys(password)
  //   await elPassword.sendKeys(Key.RETURN)
  // } else {
  //   const usernameEl = await driver.findElement(By.id('loginUsername'))
  //   await usernameEl.sendKeys(username)
  //   const elPassword = driver.findElement(By.id('loginPassword'))
  //   await elPassword.sendKeys(password)
  //   await elPassword.sendKeys(Key.RETURN)
  // }

  await driver.sleep(5000)

  return driver
}

module.exports = {login}
