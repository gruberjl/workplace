const {login, connect} = require('./index')
const pass = require('./password')

const start = async () => {
    const driver = await login('gruberjl@gmail.com', pass)
    await connect(driver)
}

start()
