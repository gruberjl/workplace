/* eslint no-unused-vars: 0 */

const {login, connect, postToGroup} = require('./index')
const pass = require('./password')

const startGrowNetwork = async () => {
  const driver = await login('gruberjl@gmail.com', pass)
  await connect(driver)
}

const startPostToGroups = async () => {
  const title = 'Microsoft To-Do has been released!'
  const message = `Microsoft has released the latest app To-Do from preview mode. It will start being seen by users shortly. Since it has been in preview for a few months it already has over 10,000 reviews combined across Android, iPhone, and Windows Store. The app is nice but is lacking a lot of features you would expect from Microsoft including sharing. Microsoft has promised to update the app with everything contained within Wunderlist. Microsoft is pitching To-Do as a replacement to Wunderlist. So I've taken a look at the app and it's good enough for me to switch from my Google Keep, which I've been using for years. I'll be pushing it out to my customers via a newsletter soon. I've made the documents public so feel free to copy them without worrying about consent or anything.

https://medium.com/@gruberjl/5-steps-to-being-more-productive-using-microsoft-to-do-9a147a1fa3f9`

  const driver = await login('gruberjl@gmail.com', pass)
  await postToGroup(driver, 'https://www.linkedin.com/groups/45151', title, message)
}

startPostToGroups()
