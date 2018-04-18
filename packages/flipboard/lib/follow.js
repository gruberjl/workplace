/* eslint no-console: 0 */

const {By, Key} = require('../../driver').webdriver

const follow = async (driver, urlToProfileToFollow, flipsToLike = 0) => {
  await driver.get(urlToProfileToFollow)

  try {
    const followBtn = await driver.findElement(By.css('.follow-text'))
    await followBtn.click()
    await driver.sleep(3000)

    if (flipsToLike > 0)
      await likeFlips(driver, flipsToLike)
  } catch (e) {
    console.log(`already following: ${urlToProfileToFollow}`)
  }

  return driver
}

const likeFlips = async (driver, flipsToLike) => {
  let likeBtn, modal
  const commentBtns = await driver.findElements(By.className('stat-label'))
  const body = driver.findElement(By.tagName('Body'))

  if (commentBtns.length < flipsToLike)
    return undefined

  for (let i=0; i < flipsToLike; i++) {
    await driver.executeScript('arguments[0].scrollIntoView(false);', commentBtns[i])
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(250)

    await commentBtns[i].click()
    await driver.sleep(500)

    likeBtn = await driver.findElement(By.className('heart-button'))
    await likeBtn.click()
    await driver.sleep(500)

    modal = await driver.findElement(By.className('modal'))
    await modal.click()
    await driver.sleep(500)
  }

}

module.exports = {follow}
