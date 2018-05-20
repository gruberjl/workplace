const {People} = require('../sharepoint')
const {login, browseSubreddit, upvoteFriends} = require('../reddit')
const {commonPassword} = require('../data')

const start = async () => {
  const people = await People.get()
  const redditers = people.filter((person) => person.reddit)
  const submitter = redditers[Math.floor(Math.random() * redditers.length)]
  process.send(`${submitter.reddit} is browsing Reddit`)
  const r = await login(submitter.reddit, commonPassword)
  process.send('Logged in')
  await browseSubreddit(r)
  process.send('Finished browsing subreddits')
  await upvoteFriends(r, submitter.reddit)
  process.send('Finished upvoting friends')
}

start()
