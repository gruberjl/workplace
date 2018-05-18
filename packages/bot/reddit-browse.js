const {People} = require('../sharepoint')
const {login, browseSubreddit, upvoteFriends} = require('../reddit')
const {commonPassword} = require('../data')

const start = async () => {
  const people = await People.get()
  const redditers = people.filter((person) => person.reddit)
  const submitter = redditers[Math.floor(Math.random() * redditers.length)]
  console.log(`${submitter.reddit} is browsing Reddit`)
  const r = await login(submitter.reddit, commonPassword)
  console.log('   Logged in')
  await browseSubreddit(r)
  console.log('   Finished browsing subreddits')
  await upvoteFriends(r, submitter.reddit)
  console.log('   Finished upvoting friends')
}

start()
