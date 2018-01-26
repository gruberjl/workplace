const {twiendsLogin, twiendsFollow} = require('./index')
const pass = require('./password')

const start = async () => {
    const driver = await twiendsLogin('gruberjl@gmail.com', pass)
    await twiendsFollow(driver)
}

start()
