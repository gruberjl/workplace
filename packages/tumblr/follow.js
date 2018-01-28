const url = 'https://www.tumblr.com/search/%23microsoft'
const webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const follow = async (driver, followersToAdd = 100) => {
  if (!driver) throw "pintrest/follow: Driver is required"

  await driver.get(url)
  await driver.sleep(5000)

  let addedFollowers = 0
  let followBtns
  const body = driver.findElement(By.tagName("Body"))

  while (addedFollowers < followersToAdd) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(1000)

    followBtns = await driver.findElements(By.className('follow-text'))
    followBtns.forEach(async (followBtn) => {
      addedFollowers++
      await driver.executeScript("arguments[0].scrollIntoView(true);", followBtn)
      await followBtn.click()
      await driver.sleep(500)
    })
  }

  await driver.sleep(10000)

  return driver
}

module.exports = {follow}
