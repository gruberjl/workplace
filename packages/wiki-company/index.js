const Driver = require('../driver')
const {wikiCompanies, HUBSPOT} = require('../data')
const webdriver = require('selenium-webdriver')
const {By} = webdriver
const fetch = require('node-fetch')
const { URL } = require('url')

const start = async () => {
  const driver = await Driver.build()

  const companies = await wikiCompanies.all

  for (let i = 0; i < companies.length; i++) {
    console.log(companies[i].Name)
    const basic = {properties: [
      {
        name: 'name',
        value: companies[i].Name
      }
    ]}

    await driver.get(companies[i].wiki)
    const els = await driver.findElements(By.css('#mw-content-text .infobox.vcard tbody tr'))
    for (let i = 0; i < els.length; i++) {
      try {
        const title = await els[i].findElement(By.css('th')).getText()
        const data = await els[i].findElement(By.css('td a')).getAttribute('href')
        if (title.toLowerCase() == 'website') {
          let domain = new URL(data)
          domain = domain.hostname
          if (domain.startsWith('www')) {
            domain = domain.substr(4)
          }
          basic.properties.push({
            name: 'domain',
            value: domain
          })
        }
      } catch (e) { }
    }
    const url = `https://api.hubapi.com/companies/v2/companies?hapikey=${HUBSPOT.HAPIkey}`
    await fetch(url, { method: 'POST', body: JSON.stringify(basic), headers: { 'Content-Type': 'application/json' } })
  }

  driver.quit()
}

start()
