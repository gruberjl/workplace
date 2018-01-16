const csv = require('csv-array')
const password = require('./password')
const PEOPLE_CSV = __dirname + '/people.csv'

const people = {
  all: new Promise((res) => {
    csv.parseCSV(PEOPLE_CSV, (data) => {
      res(data)
    })
  })
}

module.exports = {people, password}
