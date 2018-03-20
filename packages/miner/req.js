const rp = require('request-promise')
const cheerio = require('cheerio') // Basically jQuery for node.js

const start = async (uri) => {
  const options = {
    uri,
    transform: (body) => cheerio.load(body)
  }

  return await rp(options)
}

module.exports = start
