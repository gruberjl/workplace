const url = 'https://twiends.com/home'
const webdriver = require('selenium-webdriver')
const {By} = webdriver

const follow = async (driver) => {
  if (!driver) throw 'twitter/tweinds-follow: Driver is required'

  await driver.get(url)
  await driver.sleep(1000)

  await driver.findElement(By.className('mask'))
  await driver.executeScript('document.elementFromPoint(10, 10).click()')
  await driver.sleep(1000)

  const followButtons = await driver.findElements(By.className('mainbut'))

  followButtons.forEach(async (followButton) => {
    await followButton.click()
    await driver.sleep(800)
  })

  await driver.sleep(10000)

  return driver
}

module.exports = {follow}
