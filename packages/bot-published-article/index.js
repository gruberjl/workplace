/* eslint no-unused-vars: 0 */

const Driver = require('../driver')
const linkedin = require('../linkedin')
const facebook = require('../facebook')
const google = require('../google')
const creds = require('./password')

const title = 'Interview with Simon Chan on the Future of Microsoft To-Do'
const message = "Interview with Microsoft's Senior Product Manager, Simon Chan, on the Future of Microsoft To-Do. Simon Chan is best known for being a key team member in growing Wunderlist's user base to over 20 million. Simon gives key insight on the future of the app and why To-Do will be one of Microsoft Office 365's most successful apps. https://hackernoon.com/interview-with-simon-chan-on-the-future-of-microsoft-to-do-aee3a460610 #Microsoft #productivity #ToDo #Technology #Office365"

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
  await postToFacebookGroups(driver)
  await postToGooglePlusGroups(driver)
}

start()
