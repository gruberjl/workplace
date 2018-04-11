const {login, getCompany, connectTo} = require('../linkedin')
const {LINKEDIN, decisionMakerTitles} = require('../data')
const GRUBERJL = LINKEDIN.gruberjl

const start = async () => {
  const driver = await login(GRUBERJL.username, GRUBERJL.password)
  console.log('Working Troemner')
  const res = await getCompany(driver, 'https://www.linkedin.com/company/troemner-llc/')

  connect(driver, res.people)
}

const connect = async (driver, people) => {
  const titles = await decisionMakerTitles.all

  const connections = people.filter((person) => {
    if (!person.canConnect) return false
    let match = false

    titles.forEach((title) => {
      const re = new RegExp(`(${title.title})`,'gi')
      if (person.title.match(re)) {
        match = true
      }
    })

    return match
  })

  console.log(`   Connecting to ${connections.length} people`)

  for (var i = 0; i < connections.length; i++) {
    await connectTo(connections[i])
  }
}

start()
