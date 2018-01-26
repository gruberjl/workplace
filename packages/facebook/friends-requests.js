const url = 'https://www.facebook.com/friends/requests/'
const webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const scrollToBottom = async (driver) => {
  const times = 25
  const body = driver.findElement(By.tagName("Body"))

  for (let i=0; i < times; i++) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(250)
  }
}

const sendFriendRequests = async (driver, requiredMutualFriends = 10) => {
  if (!driver) throw "Facebook/firends-requsts: Driver is required"

  await driver.get(url)
  await scrollToBottom(driver)

  const potentialFriends = await driver.findElements(By.className('friendBrowserContentAlignMiddle'))

  potentialFriends.forEach(async (potentialFriend) => {
    const text = potentialFriend.findElements(By.className("_1nd3")).text
    const numOfMutualFriends = text.replace( /\D/g, '')
    if (numOfMutualFriends >= requiredMutualFriends) {
      const btn = potentialFriend.findElement(By.className('FriendRequestAdd'))
      driver.executeScript("arguments[0].scrollIntoView(true);", btn)
      await btn.click()
      await driver.sleep(250)
    }
  })

  return driver
}

module.exports = {sendFriendRequests}
