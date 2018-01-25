const chrome = require('./chrome')
const firefox = require('./firefox')

const build = async (browser = 'firefox') => {
  let driver
  if (browser == 'firefox') {
    driver = await firefox.build()
  } else {
    driver = await chrome.build()
  }

  return driver
}

module.exports = {chrome, firefox, build}
