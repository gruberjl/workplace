const { URL } = require('url')
const db = require('../data').db('company')
const req = require('./req')

const start = async () => {
  const a = await db.allDocs({include_docs: true})

  a.rows.forEach(async (b) => {
    const $ = await req(`https://www.bing.com/search?q=${b.doc.company}`)
    const u = $('#b_results .b_algo .b_caption cite').first().text()
    const n = u.toLowerCase().startsWith('http') ? u : `http://${u}`
    const myURL = new URL(n)
    b.doc.website = myURL.hostname
    // console.log(b.doc)
    db.put(b.doc)
    // console.log(b)
    // console.log(myURL.hostname)
  })
}

start()
