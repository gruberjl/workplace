const url = 'https://www.facebook.com/friends/requests/' //'file:///C:/Users/john/Downloads/Facebook.html'
const webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const scrollToBottom = async (driver) => {
  const times = 10
  const body = driver.findElement(By.tagName('Body'))

  for (let i=0; i < times; i++) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(250)
  }
}

const sendFriendRequests = async (driver, requiredMutualFriends = 10) => {
  if (!driver) throw 'Facebook/friends-requsts: Driver is required'

  await driver.get(url)
  await scrollToBottom(driver)

  const potentialFriends = (await driver.findElements(By.className('friendBrowserListUnit'))).reverse()

  let text, numOfMutualFriends, btn
  for (const potentialFriend of potentialFriends) {
    const textEl = await potentialFriend.findElement(By.className('_1nd3'))
    if (textEl) {
      text = await textEl.getText()
      numOfMutualFriends = text.replace( /\D/g, '')
      if (numOfMutualFriends >= requiredMutualFriends) {
        btn = await potentialFriend.findElement(By.className('FriendRequestAdd'))
        driver.executeScript('arguments[0].scrollIntoView(false);', btn)
        await btn.click()
        await driver.sleep(250)
      }
    }
  }

  return driver
}

module.exports = {sendFriendRequests}
