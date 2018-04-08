const {login, getCompany} = require('../linkedin')
const {LINKEDIN} = require('../data')
const GRUBERJL = LINKEDIN.gruberjl

const start = async () => {
  const driver = await login(GRUBERJL.username, GRUBERJL.password)
  const res = await getCompany(driver, 'https://www.linkedin.com/company/16149153/')
  await driver.quit()
  console.log(res)
}

start()
