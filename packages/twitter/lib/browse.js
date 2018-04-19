/* eslint no-empty: 0, no-unused-vars: 0 */
const Driver = require('../../driver')
const {By, Key} = Driver.webdriver

const url = 'https://twitter.com/login'
const tags = ['MicrosoftTeams', 'sharepoint', 'office2016', 'office365', 'exchangeonline', 'microsoftflow', 'onedrive', 'OfficeProPlus', 'SharePointOnline']

const login = async (username, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get(url)
  await driver.sleep(1000)
  const elEmail = driver.findElement(By.className('js-username-field'))
  const elPassword = driver.findElement(By.className('js-password-field'))

  await elEmail.sendKeys(username)
  await elPassword.sendKeys(password)
  await elPassword.sendKeys(Key.RETURN)
  await driver.sleep(5000)

  return driver
}

const findAndLikeTweet = async (driver, tweet) => {
  const tweetText = await tweet.findElement(By.className('tweet-text'))
  const text = await tweetText.getText()

  const found = tags.find(function(element) {
    return text.toLowerCase().includes(element.toLowerCase())
  })

  if (found) {
    await driver.executeScript('arguments[0].scrollIntoView(true);', tweet)
    await driver.sleep(500)
    const favBtn = await tweet.findElement(By.className('js-actionFavorite'))
    await favBtn.click()
    await driver.sleep(1000)
  }
}

const browseMoments = async (driver) => {
  const url = 'https://twitter.com/i/moments'

  await driver.get(url)
  await driver.sleep(1000)

  const body = driver.findElement(By.tagName('body'))
  const timesToPageDown = Math.floor(Math.random() * 11)
  for (let i = 0; i < timesToPageDown; i++) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(Math.floor(Math.random()*(2000-500+1)+500))
  }
}

const browseNotifications = async (driver) => {
  const url = 'https://twitter.com/i/notifications'
  await driver.get(url)
  await driver.sleep(Math.floor(Math.random()*(5000-500+1)+500))
}

const browseMessages = async (driver) => {
  try {
    const messageBtn = await driver.findElement(By.className('global-dm-nav'))
    await driver.executeScript('arguments[0].scrollIntoView(true);', messageBtn)
    await driver.sleep(500)
    await messageBtn.click()
    await driver.sleep(Math.floor(Math.random()*(2000-1000+1)+1000))
    const markAllReadBtn = await driver.findElement(By.className('mark-all-read'))
    await markAllReadBtn.click()
    const body = driver.findElement(By.tagName('body'))
    await body.sendKeys(Key.ESCAPE)
  } catch (e) {

  }
}

const browseFeed = async (driver) => {
  const body = driver.findElement(By.tagName('body'))
  const timesToPageDown = Math.floor(Math.random()*(25-5+1)+5)
  for (let i = 0; i < timesToPageDown; i++) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(Math.floor(Math.random()*(2000-500+1)+500))
  }
}


const browse = async (username, password) => {
  const driver = await login(username, password)

  // const tweets = await driver.findElements(By.className('tweet'))
  //
  // for (let i = 0; i < tweets.length; i++) {
  //   let tweetText
  //   try {
  //     tweetText = await tweets[i].findElement(By.className('tweet-text'))
  //   } catch (e) { }
  //
  //   if (tweetText) {
  //     await findAndLikeTweet(driver, tweets[i])
  //   }
  // }
  await browseFeed(driver)
  await browseMoments(driver)
  await browseNotifications(driver)
  await browseMessages(driver)

  return driver
}

module.exports = {browse}
