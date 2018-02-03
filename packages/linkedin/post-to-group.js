const {By} = require('selenium-webdriver')

const postToGroup = async (driver, groupUrl, title, message) => {
  if (!driver) throw 'LinkedIn/post-to-group: Driver is required'
  if (!groupUrl) throw 'LinkedIn/post-to-group: groupUrl is required'
  if (!title) throw 'LinkedIn/post-to-group: title is required'
  if (!message) throw 'LinkedIn/post-to-group: message is required'

  await driver.get(groupUrl)
  await driver.sleep(3000)

  const textBox = await driver.findElement(By.className('js-form-title'))
  await textBox.click()
  await driver.sleep(1000)

  const titleBox = await driver.findElement(By.name('title'))
  await titleBox.sendKeys(title)
  await driver.sleep(1000)

  const bodyBox = await driver.findElement(By.name('body'))
  await bodyBox.sendKeys(message)
  await driver.sleep(4000)

  const submitBtn = await driver.findElement(By.className('action-submit'))
  await driver.executeScript('arguments[0].scrollIntoView(false);', submitBtn)
  await submitBtn.click()
  await driver.sleep(5000)
}

module.exports = {postToGroup}
