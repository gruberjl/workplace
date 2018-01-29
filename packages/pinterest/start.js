const {login, follow} = require('./index')
const pass = require('./password')

const start = async () => {
  const driver = await login('john.gruber@gitbit.org', pass)
  await follow(driver)
}

start()
