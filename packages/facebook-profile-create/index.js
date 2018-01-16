const data = require('data')
const signUp = require('./sign-up')

data.people.all.then((people) => {
  signUp.createAll(people, data.password)
})
