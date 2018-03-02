/* eslint no-console: 0 */

var webdriver = require('selenium-webdriver')
const {By, Key} = webdriver

const getTweets = async (driver, numOfPgDowns) => {
  const body = await driver.findElement(By.tagName('Body'))

  for (let i=0; i < numOfPgDowns; i++) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(500)
  }

  const tweets = (await driver.findElements(By.className('tweet'))).reverse()

  return tweets
}

const getRetweeted = async (driver, usernames = []) => {
  const retweetedBtns = await driver.findElements(By.className('request-retweeted-popup'))
  if (retweetedBtns.length > 0) {
    await driver.executeScript('arguments[0].scrollIntoView(false);', retweetedBtns[0])
    await driver.sleep(250)
    retweetedBtns[0].click()
    const usernamesEl = await driver.findElements(By.className('username'))
    for(const usernameEl of usernamesEl) {
      usernameEl.push(await usernameEl.getText())
    }
    await driver.findElement(By.className('modal-close')).click()
    await driver.sleep(250)

    return usernames
  }
}

const getRetweeters = async (driver, usernames = []) => {
  const retweetedBtns = await driver.findElements(By.className('request-retweeted-popup'))
  if (retweetedBtns.length > 0) {
    await driver.executeScript('arguments[0].scrollIntoView(false);', retweetedBtns[0])
    await driver.sleep(250)
    retweetedBtns[0].click()
    const usernamesEl = await driver.findElements(By.className('username'))
    for(const usernameEl of usernamesEl) {
      usernames.push(await usernameEl.getText())
    }
    await driver.findElement(By.className('modal-close')).click()
    await driver.sleep(250)
    return usernames
  }
}

const openTweet = async (driver, el) => {
  console.log('opening tweet')
  await driver.executeScript('arguments[0].scrollIntoView(false);', el)
  await driver.sleep(250)

  const {width} = await el.getRect()

  const actions = driver.actions()
  const x = Math.round(-width/2)+10
  console.log(x)
  await actions.move({x, origin: el}).click().perform()

  await driver.sleep(500)
}

const closeTweet = async (driver) => {
  const body = await driver.findElement(By.tagName('Body'))
  await body.sendKeys(Key.ESCAPE)
}

const getFollowers = async (driver, hashtag, numOfPgDowns = 25) => {
  await driver.get(`https://twitter.com/hashtag/${hashtag}`)
  const tweets = await getTweets(driver, numOfPgDowns)
  const usernames = []
  console.log(tweets.length)
  console.log(tweets[0])
  await openTweet(driver, tweets[0])
  await getRetweeters(driver, usernames)
  await closeTweet(driver)

  console.log(usernames)

  return usernames
  // const users = await getRetweeted(driver)
  // console.log(users)
  // for (let i=0; i < tweets.length; i++) {
  //   await openTweet(driver, tweets[i])
  // }
}

module.exports = {getFollowers}
