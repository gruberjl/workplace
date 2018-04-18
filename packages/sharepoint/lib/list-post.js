
const listPost = async (sp, siteUrl, listTitle, item) => {
  const digest = await sp.requestDigest(siteUrl)
  const headers = { 'X-RequestDigest': digest }
  const url = `${siteUrl}/_api/web/lists/GetByTitle('${listTitle}')/items`
  const listItemType = listTitle.replace(/-/g, '')
  const body = Object.assign({'__metadata': { 'type': `SP.Data.${listItemType}ListItem` }}, item)
  const results = await sp.post(url, {headers, body})

  return results
}

module.exports = {listPost}
