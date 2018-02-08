const webdriver = require('selenium-webdriver')
const {By, Key} = webdriver

const getMagazine = async (driver, url, numOfPgDowns = 5) => {
  await driver.get(url)
  const body = driver.findElement(By.tagName('Body'))

  for (let i=0; i < numOfPgDowns; i++) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(500)
  }
}

const getStats = async (driver) => {
  const stats = driver.findElements(By.className('stats'))

  return stats
}

const getLikers = async (driver, likers) => {
  let user
  const els = await driver.findElements(By.css('.avatars a'))
  for (const el of els) {
    user = await el.getAttribute('href')
    likers.push(user)
  }
}

const getLikersLoop = async (driver, stats) => {
  let modal
  const likers = []
  for (const stat of stats) {
    await driver.executeScript('arguments[0].scrollIntoView(false);', stat)
    await stat.click()
    await driver.sleep(500)
    await getLikers(driver, likers)
    modal = await driver.findElement(By.className('modal'))
    await modal.click()
    await driver.sleep(500)
  }

  return likers.filter((item, pos, self) => self.indexOf(item) == pos)
}

const getMagazineFollowers = async (driver, url, numOfPgDowns) => {
  await getMagazine(driver, url, numOfPgDowns)
  const stats = await getStats(driver)
  const followers = await getLikersLoop(driver, stats)
  return followers
}

module.exports = {getMagazineFollowers}
