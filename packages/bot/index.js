const Driver = require('driver')
const google = require('google')
const Medium = require('medium')

const start = async () => {
  const email = "John.Gaven8891@gmail.com"
  const p = "qweQWE123!@#"
  const driver = await Driver.build()
  await google.login(email, p, driver)
  await Medium.login(driver)
  await Medium.read.latestArticle(driver)

  //await driver.sleep(3000)
  //await driver.quit()
}

start()
