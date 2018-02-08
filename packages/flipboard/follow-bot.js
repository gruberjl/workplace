const {login} = require('./login')
const {getMagazineFollowers} = require('./get-magazine-followers')
const {follow} = require('./follow')
const {gruberjl} = require('./password')

const autoFollow = async (urlToMagazine) => {
  const driver = await login(gruberjl.email, gruberjl.password)
  const followers = await getMagazineFollowers(driver, urlToMagazine, 25)
  // const followers = ['https://flipboard.com/@PetraTuijl']

  for (const follower of followers) {
    await follow(driver, follower, 3)
  }
}

autoFollow('https://flipboard.com/topic/microsoftoffice')
