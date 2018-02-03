/* eslint no-unused-vars: 0 */

const {name, email} = require('./data')
const {signup} = require('./signup')
const {login, getUsername} = require('./login')
const {follow} = require('./follow')

const signups = async () => {
  let i, driver
  for (i = 0; i < name.length; i++) {
    driver = await signup(name[i], 'qweQWE123!@#', email[i])
    // await follow(driver, 'https://flipboard.com/@gruberjl')
    await driver.quit()
  }
}

const getUsernames = async () => {
  let driver, i, username

  for (i = 0; i < name.length; i++) {
    driver = await login(email[i], 'qweQWE123!@#')
    username = await getUsername(driver)
    await follow(driver, 'https://flipboard.com/@gruberjl')
    console.log(username)
    await driver.quit()
  }
}

getUsernames()
