const {signup} = require('./lib/signup')
const {csv, commonPassword} = require('../data')

process.on('unhandledRejection', r => console.log(r))

const start = async () => {
  const people = await csv()

  for (let i = 0; i < people.length; i++) {
    if (!people[i].stumbleupon && people[i].flipboard) {
      const p = people[i]
      await signup(p.email, p.flipboard, commonPassword, p.birthmonth, p.birthday, p.birthyear, p.sex)
    }
    if (i > 5)
      break
  }
}

start()
