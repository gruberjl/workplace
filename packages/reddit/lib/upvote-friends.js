/*
get a subbreddit
get submissions of a subbreddit (25)
filter to only see unread
mark all as read
pick random submissions and upvote
*/
const sleep = require('sleep-promise')
const {People} = require('../../sharepoint')

const acceptedDomains = ['documentmedia.com', 'gitbit.org']

const upvoteUser = async (r, username) => {
  const user = await r.getUser(username)
  const submissions = await user.getSubmissions()

  for (let i = 0; i < submissions.length; i++) {
    const domainIsApproved = acceptedDomains.includes(submissions[i].domain)
    const isLiked = submissions[i].likes || false

    await sleep(Math.floor(Math.random() * 5000))
    if (!isLiked && domainIsApproved) {
      await submissions[i].upvote()
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const upvoteFriends = async (r, username) => {
  const people = shuffle(await People.get()).filter((person) => person.reddit)
  for (let i = 0; i < people.length; i++) {
    if (people[i].reddit != username) {
      await upvoteUser(r, people[i].reddit)
    }
  }
}

module.exports = {upvoteFriends}
