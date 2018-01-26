const url = 'https://twiends.com/home'
const webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const twiendsFollow = async (driver) => {
  if (!driver) throw "twitter/tweinds-follow: Driver is required"

  await driver.get(url)
  await driver.sleep(1000)

  await driver.findElement(By.className('mask'))
  await driver.executeScript('document.elementFromPoint(10, 10).click()')
  await driver.sleep(250)

  const followButtons = await driver.findElements(By.className('mainbut'))

  followButtons.forEach(async (followButton) => {
    await followButton.click()
    await driver.sleep(250)
  })

  await driver.sleep(10000)

  return driver
}

module.exports = {twiendsFollow}
