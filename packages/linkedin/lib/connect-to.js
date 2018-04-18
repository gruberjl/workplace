const {By} = require('../../driver').webdriver

const connectTo = async (driver, url) => {
  await driver.get(url)
  await driver.sleep(2000)
  const connectBtn = await driver.findElement(By.className('v-s-profile-actions--connect'))
  await connectBtn.click()

  return driver
}

module.exports = {connectTo}
