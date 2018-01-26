const {Builder, By, Key, until} = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')

const build = async (disableNotifications = true) => {
  const options = new firefox.Options()

  if (disableNotifications) options.setPreference("dom.webnotifications.enabled", false)
  let driver = await new Builder().forBrowser('firefox').withCapabilities(options).build();
  return driver
}

module.exports = {build}
