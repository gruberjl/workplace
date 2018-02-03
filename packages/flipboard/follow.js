var webdriver = require('selenium-webdriver')
const {By} = webdriver

const follow = async (driver, urlToProfileToFollow) => {
  await driver.get(urlToProfileToFollow)

  const followBtn = await driver.findElement(By.css('.follow-text'))
  await followBtn.click()
  await driver.sleep(2000)

  return driver
}

module.exports = {follow}
