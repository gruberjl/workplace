const Driver = require('../../driver')
const {By, Key} = Driver.webdriver

const browse = async (username, password) => {
  const driver = await login(username, password)

  return driver
}

module.exports = {browse}
