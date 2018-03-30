const chrome = require('./chrome')

const build = async () => {
  const driver = await chrome.build()

  return driver
}

module.exports = {chrome, build}
