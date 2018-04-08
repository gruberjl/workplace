const {browse} = require('../twitter')
const {csv, commonPassword} = require('../data')

const start = async () => {
  const people = await csv()

  for (let i = 0; i < people.length; i++) {
    if (people[i].twitter) {
      const driver = await browse(people[i].twitter, commonPassword)
      await driver.quit()
    }
  }
}

start()
