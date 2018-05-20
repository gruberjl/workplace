
const submitLink = async (r, subreddit, url, title) => {
  const results = await r.getSubreddit(subreddit).submitLink({title, url})
  
  return results
}

module.exports = {submitLink}
