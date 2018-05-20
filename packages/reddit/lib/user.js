
const getUser = async (r, username) => {
  const user = await r.getUser(username)

  return user
}

const getSubmissions = async (r, username) => {
  const user = await getUser(r, username)
  const submissions = await user.getSubmissions()

  return submissions
}

module.exports = {getUser, getSubmissions}
