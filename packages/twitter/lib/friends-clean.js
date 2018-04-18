const Twit = require('twit')

const getFollowers = async (T, cursor = 1) => {
  const followersResponse = await T.get('followers/ids')

  const cursorPos = followersResponse.data.ids.length - (100 * cursor)
  const user_id = followersResponse.data.ids.slice(cursorPos, cursorPos + 100)
  const usersResponse = await T.get('users/lookup', {user_id})

  return usersResponse.data
}

const filterUnfriend = async (T, users) => {
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

const unfollow = async (T, users) => {
  for (let i = 0; i < users.length; i++) {
    await T.post('friendships/destroy', {screen_name:users[i].screen_name})
  }
}

const authenticate = (user) => new Twit(user)

const friendsClean = async (user) => {
  const T = await authenticate(user)
  const users = await getFollowers(T)
  const usersToUnfollow = await filterUnfriend(T, users)
  await unfollow(T, usersToUnfollow)
}

module.exports = {friendsClean}
