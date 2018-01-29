/* eslint no-unused-vars: 0 */

const Driver = require('../driver')
const twitter = require('../twitter')
const linkedin = require('../linkedin')
const facebook = require('../facebook')
const pinterest = require('../pinterest')
const tumblr = require('../tumblr')
const creds = require('./password')

const twiends = async (driver) => {
  await twitter.twiendsLogin(creds.twiends.username, creds.twiends.password, driver)
  await twitter.twiendsFollow(driver)
  await driver.sleep(3000)
}

const linkedinConnect = async (driver) => {
  await linkedin.login(creds.linkedin.username, creds.linkedin.password, driver)
  await linkedin.connect(driver)
  await driver.sleep(3000)
}

const facebookFriendRequest = async (driver) => {
  await facebook.login(creds.facebook.username, creds.facebook.password, driver)
  await facebook.sendFriendRequests(driver)
  await driver.sleep(3000)
}

const pinterestFollow = async (driver) => {
  await pinterest.login(creds.pinterest.username, creds.pinterest.password, driver)
  await pinterest.follow(driver)
  await driver.sleep(3000)
}

const tumblrFollow = async (driver) => {
  await tumblr.login(creds.tumblr.username, creds.tumblr.password, driver)
  await tumblr.follow(driver)
  await driver.sleep(3000)
}

const start = async () => {
  const driver = await Driver.build()

  await twiends(driver)

  await linkedinConnect(driver)

  await facebookFriendRequest(driver)

  await pinterestFollow(driver)

  await tumblrFollow(driver)

  await driver.sleep(3000)
  await driver.quit()
}

start()
