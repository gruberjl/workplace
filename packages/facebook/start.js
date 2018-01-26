const {login, sendFriendRequests} = require('./index')
const pass = require('./password')

const start = async () => {
    const driver = await login('gruberjl@gmail.com', pass)
    await sendFriendRequests(driver)
}

start()
