const {By, Key} = require('../../driver').webdriver

const postToGroup = async (driver, groupUrl, message) => {
  if (!driver) throw 'google/post-to-group: Driver is required'
  if (!groupUrl) throw 'google/post-to-group: groupUrl is required'
  if (!message) throw 'google/post-to-group: message is required'

  await driver.get(groupUrl)
  await driver.sleep(3000)

  const textBox = await driver.findElement(By.className('OnYLS'))
  await textBox.click()
  await driver.sleep(1000)

  const bodyBox = await driver.findElement(By.id('pg7w8'))
  await bodyBox.sendKeys(message)
  await driver.sleep(2000)
  await bodyBox.sendKeys(Key.chord(Key.CONTROL, Key.RETURN))
  await driver.sleep(2000)

  const categories = await driver.findElements(By.className('Jxhqvd'))
  if (categories && categories.length > 0) {
    await categories[0].click()
    await driver.sleep(2000)
  }

  await driver.sleep(1000)
}

module.exports = {postToGroup}
