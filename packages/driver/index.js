var webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const {By, until, Key} = webdriver

const build = async (browser = 'chrome', disableNotifications = true) => {
  const options = new chrome.Options()

  if (disableNotifications) options.addArguments("--disable-notifications")
  
  const driver = new webdriver.Builder().forBrowser(browser).withCapabilities(options).build()
  return driver
}

const destroy = async (driver) => {
  await driver.quit()
  driver = null
  return true
}

module.exports = {build}
