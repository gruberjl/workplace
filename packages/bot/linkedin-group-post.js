const {Posts, People} = require('../sharepoint')
const linkedin = require('../linkedin')

const start = async () => {
  const person = (await People.get('ID eq 20'))[0]
  const posts = await Posts.get('$filter=approved eq 1 and postedat eq null and app eq \'linkedin\'&$orderby=postafter')

  if (posts.length > 0) {
    const driver = await linkedin.login(person.Title, person.linkedinpassword)
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      if (new Date(posts[0].postafter) < new Date()) {
        await linkedin.postToGroup(driver, post.codeid, post.Title, `${post.summary}\n${post.url.Url}`)
        await Posts.update(post.ID, {postedat: (new Date().toISOString())})
        // process.send(`Posted to LinkedIn group ${post.codeid}: ${post.Title}`)
      }
    }
    await driver.quit()
  } else {
    process.send('No posts are ready for LinkedIn groups.')
  }
}

start()
