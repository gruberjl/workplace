const {Posts, People} = require('../sharepoint')
const twitter = require('../twitter')

const start = async () => {
  const posts = await Posts.get('$filter=approved eq 1 and postedat eq null and app eq \'twitter\'&$orderby=postafter&$top=1')

  if (posts.length>0 & new Date(posts[0].postafter) < new Date()) {
    await postToTwitter(posts[0].summary)
    Posts.update(posts[0].ID, {postedat: (new Date().toISOString())})
  } else {
    process.send('No tweets are ready for twitter.')
  }
}

const postToTwitter = async (summary) => {
  process.send(`tweeting: ${summary}`)
  const person = (await People.get('ID eq 20'))[0]
  const result = await twitter.post(person.twitter_access_token, person.twitter_access_token_secret, summary)
  result.data.id ? process.send('successfully posted.') : process.send('failed to post')
}

start()
