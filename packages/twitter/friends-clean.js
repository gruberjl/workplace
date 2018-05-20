const Twit = require('twit')
const {Apps, People} = require('../sharepoint')

const filterUnfriend = (users) => {
  const usersToUnfollow = users.filter((user) => {
    const name = user.name.toLowerCase()
    if (
      name.indexOf('gruber') != -1 ||
      name.indexOf('ridley') != -1 ||
      name.indexOf('fuydal') != -1 ||
      name.indexOf('lloyd') != -1
    ) return false
    if (user.lang !== 'en') return true
    if (user.status && user.status.possibly_sensitive) return true
    const description = user.description.toLowerCase()
    if (
      description.indexOf('microsoft') != -1 ||
      description.indexOf('office') != -1 ||
      description.indexOf('sharepoint') != -1 ||
      description.indexOf('onedrive') != -1 ||
      description.indexOf('google') != -1 ||
      description.indexOf('cloud') != -1 ||
      description.indexOf('elon musk') != -1 ||
      description.indexOf('phoenixville') != -1 ||
      description.indexOf('salesforce') != -1 ||
      description.indexOf('dynamics') != -1 ||
      description.indexOf('solar') != -1 ||
      description.indexOf('strateg') != -1 ||
      description.indexOf('communication') != -1 ||
      description.indexOf('collaborate') != -1
    ) return false

    return true
  })

  return usersToUnfollow
}

const start = async () => {
  const person = (await People.get('ID eq 20'))[0]
  const app = await Apps.get('twitter')

  const T = new Twit({
    consumer_key:app.client_id,
    consumer_secret:app.client_secret,
    access_token: person.twitter_access_token,
    access_token_secret: person.twitter_access_token_secret
  })

  let cursor = -1
  let friends = []
  for (let i = 0; i < 5; i++) {
    const res = await T.get('friends/list', {count: 200, cursor})
    const code = res.resp.statusCode
    if (code == 200 && res.data && res.data.users && Array.isArray(res.data.users)) {
      cursor = res.data.next_cursor
      friends = friends.concat(res.data.users)
    }
  }

  const usersToUnfollow = filterUnfriend(friends)

  let previousCode = 200
  let unfriendCount = 0
  for (let i = 0; i < 500; i++) {
    if (previousCode == 200) {
      const usr = usersToUnfollow[i]
      const res = await T.post('friendships/destroy', {user_id: usr.id_str})
      previousCode = res.resp.statusCode
      if (res.resp.statusCode != 200) {
        console.log(`Error unfriending: ${res.resp.statusMessage}`)
      } else {
        unfriendCount++
      }
    }
  }

  console.log(`Unfriended: ${unfriendCount}`)
}

start()
