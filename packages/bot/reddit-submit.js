const {People} = require('../sharepoint')
const {login, submitLink} = require('../reddit')
const {commonPassword} = require('../data')

const start = async (subreddit, url, title) => {
  const people = await People.get()
  const redditers = people.filter((person) => person.reddit)
  const submitter = redditers[Math.floor(Math.random() * redditers.length)]
  console.log(`${submitter.reddit} is submitting ${url} to ${subreddit}`)
  const r = await login(submitter.reddit, commonPassword)
  await submitLink(r, subreddit, url, title)
}

const subreddit = 'GitBitOrg'
const url = 'http://gitbit.org'
const title = 'GitBit Home Page'
start(subreddit, url, title)
