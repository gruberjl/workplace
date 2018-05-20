const {Posts, People} = require('../sharepoint')
const {login, submitLink} = require('../reddit')
const {commonPassword} = require('../data')

const postToReddit = async (subreddit, url, title) => {
  const people = await People.get()
  const redditers = people.filter((person) => person.reddit)
  const submitter = redditers[Math.floor(Math.random() * redditers.length)]
  process.send(`${submitter.reddit} is submitting ${url} to ${subreddit}`)
  const r = await login(submitter.reddit, commonPassword)
  await submitLink(r, subreddit, url, title)
}

const getNextSubmission = async () => {
  const posts = await Posts.get('$filter=approved eq 1 and postedat eq null and app eq \'reddit\'&$orderby=postafter&$top=1')
  if (posts.length>0 & new Date(posts[0].postafter) < new Date()) {
    return posts[0]
  } else {
    process.send('No submissions for Reddit are available.')
  }
}

const submitToReddit = async () => {
  const submission = await getNextSubmission()
  if (submission) {
    await postToReddit(submission.codeid, submission.url.Url, submission.Title)
    Posts.update(submission.ID, {postedat: (new Date().toISOString())})
  }
}

submitToReddit()
