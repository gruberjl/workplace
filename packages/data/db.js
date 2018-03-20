var PouchDB = require('pouchdb')

const build = (name) => new PouchDB(name)

module.exports = build
