const {signup} = require('../twitter')
const {csv, commonPassword} = require('../data')

const start = async () => {
  const people = await csv()

  let count = 0
  for (let i = 0; i < people.length; i++) {

    if (!people[i].twitter && !people[i].twitter_dead) {
      signup(`${people[i].first} ${people[i].last}`, people[i].email, people[i].BizSugar, commonPassword)
      count++
      if (count > 5) break
    }
  }
}

start()
