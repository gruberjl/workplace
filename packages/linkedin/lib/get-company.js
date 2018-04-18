const {By} = require('../../driver').webdriver

const getCompanyFollowersCount = async (driver) => {
  var followersEl = await driver.findElement(By.className('org-top-card-module__followers-count'))
  const text = await followersEl.getText()
  return text.split(' ')[0]
}

const getCompanyEmployeeName = (el) =>
  el.findElement(By.className('name')).then((nameEl) => nameEl.getText()).catch(() => '')

const getCompanyEmployeeTitle = (el) => el.findElement(By.className('subline-level-1')).then((titleEl) => titleEl.getText())
const getCompanyEmployeeLocation = (el) => el.findElement(By.className('subline-level-2')).then((locationEl) => locationEl.getText())
const getCompanyEmployeeLink = (el) => el.findElement(By.className('search-result__result-link'))
  .then((linkEl) => linkEl.getAttribute('href'))

const getCanConnect = async (el) => {
  try {
    const btn = await el.findElement(By.className('search-result__actions--primary'))
    const text = await btn.getText()
    return text == 'Connect'
  } catch (e) { }

  return false
}

const getCompanyEmployee = async (el) => {
  const name = await getCompanyEmployeeName(el)
  const title = await getCompanyEmployeeTitle(el)
  const location = await getCompanyEmployeeLocation(el)
  const link = await getCompanyEmployeeLink(el)
  const canConnect = await getCanConnect(el)

  return {name, title, location, link, canConnect}
}

const getCompanyEmployeesPage = async (driver, companyId, page=1) => {
  const people = []

  await driver.get(`https://www.linkedin.com/search/results/people/?facetCurrentCompany=${companyId}&page=${page}`)
  await driver.sleep(2000)
  await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
  await driver.sleep(500)
  const els = await driver.findElements(By.className('search-result__wrapper'))

  for (var i = 0; i < els.length; i++) {
    const person = await getCompanyEmployee(els[i])
    people.push(person)
  }

  let hasAnotherPage = true
  try {
    await driver.findElement(By.className('next'))
  } catch(e) {
    hasAnotherPage = false
  }

  return {people, hasAnotherPage}
}

const getCompanyEmployees = async (driver, companyId) => {
  let page = 1
  let people = []
  let hasAnotherPage = true

  while (hasAnotherPage) {
    const results = await getCompanyEmployeesPage(driver, companyId, page)
    hasAnotherPage = results.hasAnotherPage
    people = people.concat(results.people)
    page++
  }

  return people
}

const getCompanyInfo = async (driver) => {
  const results = {}
  results.title = await driver.getTitle()
  results.followersCount = await getCompanyFollowersCount(driver)
  results.url = await driver.getCurrentUrl()
  results.companyId = getCompanyId(results.url)
  results.people = await getCompanyEmployees(driver, results.companyId)

  return results
}

const getCompanyId = (companyUrl) => companyUrl.split('/')[4]

exports.getCompany = async (driver, url) => {
  await driver.get(url)
  await driver.sleep(2000)
  const companyInfo = await getCompanyInfo(driver)

  return companyInfo
}
