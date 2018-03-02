/* eslint no-unused-vars: 0 */
const {twiendsLogin, twiendsFollow} = require('./index')
const pass = require('./password')

const startTwiends = async () => {
  const driver = await twiendsLogin('gruberjl@gmail.com', pass)
  await twiendsFollow(driver)
}

const start = async () => {
  
}

start()
