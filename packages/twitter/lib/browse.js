/* eslint no-empty: 0 */
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


const browse = async (username, password) => {
  const driver = await login(username, password)

  const tweets = await driver.findElements(By.className('tweet'))

  for (let i = 0; i < tweets.length; i++) {
    let tweetText
    try {
      tweetText = await tweets[i].findElement(By.className('tweet-text'))
    } catch (e) { }

    if (tweetText) {
      await findAndLikeTweet(driver, tweets[i])
    }
  }
  return driver
}

module.exports = {browse}
