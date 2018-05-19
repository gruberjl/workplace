const {login} = require('./login')
const user = require('./password')
const siteUrl = 'https://gitbit.sharepoint.com/sites/Marketing'

const listUpdate = async (listTitle, id, item) => {
  const sp = await login(user.username, user.password)
  const listTitleUpper = listTitle.charAt(0).toUpperCase() + listTitle.substr(1)
  const digest = await sp.requestDigest(siteUrl)

  let results
  try {
    results = await sp.post(
      `${siteUrl}/_api/web/lists/GetByTitle('${listTitle}')/items(${id})`,
      {
        headers: { 'X-RequestDigest': digest, 'X-HTTP-Method': 'MERGE', 'IF-MATCH': '*' },
        body: Object.assign(
          {'__metadata': { 'type': `SP.Data.${listTitleUpper}ListItem`}},
          item
        )
      })
  } catch (e) {
    results = {statusCode: e.statusCode, statusMessage:e.message}
  }

  return {statusCode: results.statusCode, statusMessage:results.statusMessage}
}

module.exports = {listUpdate}
