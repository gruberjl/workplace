/* eslint no-unused-vars: 0 */

const Driver = require('../driver')
const linkedin = require('../linkedin')
// const facebook = require('../facebook')
// const google = require('../google')
const creds = require('./password')

const title = 'What Is Office 365?'
const message = "Office 365 is Microsoft’s cloud for businesses. Designed around productivity and collaboration, Microsoft has integrated over 30 apps into the cloud platform. From email, file storage, and secure chat for teams, businesses around the world are empowering their users by improving productivity while cutting costs. Microsoft’s continued shift to cloud computing has had a significant impact on businesses. http://documentmedia.com/article-2792-What-Is-Office-365.html #Microsoft #productivity #Technology #Office365"

const postToLinkedInGroups = async (driver) => {
  await linkedin.login(creds.linkedin.username, creds.linkedin.password, driver)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/45151', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/51825', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/1120997', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/3724282', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/1832255', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/663807', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/3617206', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/150252', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/1861715', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/45330', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/2351153', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/3938927', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/89846', title, message)
  await linkedin.postToGroup(driver, 'https://www.linkedin.com/groups/1926688', title, message)
}

const postToFacebookGroups = async (driver) => {
  await facebook.login(creds.facebook.username, creds.facebook.password, driver)
  await facebook.postToGroup(driver, 'https://www.facebook.com/groups/1629390573966502/', message)
  await facebook.postToGroup(driver, 'https://www.facebook.com/groups/1530631073890641', message)
  await facebook.postToGroup(driver, 'https://www.facebook.com/groups/117547242139482', message)
  await facebook.postToGroup(driver, 'https://www.facebook.com/groups/262321783978587', message)
  await facebook.postToGroup(driver, 'https://www.facebook.com/groups/O365Team', message)
  await facebook.postToGroup(driver, 'https://www.facebook.com/groups/SmallBiz.DS.MLM', message)
}

const postToGooglePlusGroups = async (driver) => {
  await google.login(creds.google.username, creds.google.password, driver)
  await google.postToGroup(driver, 'https://plus.google.com/communities/117138373167597089101', message)
  await google.postToGroup(driver, 'https://plus.google.com/communities/114582343442158817928', message)
  // await google.postToGroup(driver, 'https://plus.google.com/communities/110729656096374290306', message)
  await google.postToGroup(driver, 'https://plus.google.com/communities/111141645023972857501', message)
  await google.postToGroup(driver, 'https://plus.google.com/communities/100962752238451550338', message)
}

const start = async () => {
  const driver = await Driver.build()
  await postToLinkedInGroups(driver)
  // await postToFacebookGroups(driver)
  // await postToGooglePlusGroups(driver)
}

start()
