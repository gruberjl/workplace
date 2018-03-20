const path = require('path')
const PouchDB = require('pouchdb')
const csvArray = require('csv-array')
// const password = require('./password')
const PEOPLE_CSV = __dirname + '/people.csv'

const people = {
  all: new Promise((res) => {
    csvArray.parseCSV(PEOPLE_CSV, (data) => {
      res(data)
    })
  })
}

const db = (name) => {
  return new PouchDB(path.join(__dirname, name))
}

const commonPassword = require('./password').commonPassword
const twitterAccount = require('./password').twitter

const csv = async () => new Promise((res) => {
  csvArray.parseCSV(PEOPLE_CSV, (data) => {
    res(data)
  })
})

module.exports = {people/*, password*/, db, commonPassword, csv, twitterAccount}
