const listGet = async (sp, siteUrl, listName) => {
  return sp.get(`${siteUrl}/_api/web/lists/GetByTitle('${listName}')`)
}

module.exports = {listGet}
