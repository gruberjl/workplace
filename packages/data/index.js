const path = require('path')
const PouchDB = require('pouchdb')
const csvArray = require('csv-array')
// const password = require('./password')
const PEOPLE_CSV = __dirname + '/people.csv'
const WIKI_COMPANIES_CSV = __dirname + '/wiki-companies.csv'

const people = {
  all: new Promise((res) => {
    csvArray.parseCSV(PEOPLE_CSV, (data) => {
      res(data)
    })
  })
}

const wikiCompanies = {
  all: new Promise((res) => {
    csvArray.parseCSV(WIKI_COMPANIES_CSV, (data) => {
      res(data)
    })
  })
}

const DB = (name) => {
  return new PouchDB(path.join(__dirname, name))
}

const twitterApp = require('./password').twitterApp
const commonPassword = require('./password').commonPassword
const twitterAccount = require('./password').twitter
const HUBSPOT = require('./password').HUBSPOT
const LINKEDIN = require('./password').LINKEDIN

const csv = async () => new Promise((res) => {
  csvArray.parseCSV(PEOPLE_CSV, (data) => {
    res(data)
  })
})

module.exports = {people, DB, db:DB, commonPassword, csv, twitterAccount, twitterApp, wikiCompanies, HUBSPOT, LINKEDIN}
