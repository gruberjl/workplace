const Driver = require('driver')
var webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver
const reader = require('./reader')

const start = async () => {
  const driver = await Driver.build()
  reader.latestArticle(driver)
}

start()
