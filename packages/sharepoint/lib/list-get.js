const listGet = async (sp, siteUrl, listName, affix) => {
  affix ? affix = `/${affix}` : affix = ''
  return sp.get(`${siteUrl}/_api/web/lists/GetByTitle('${listName}')${affix}`)
}

module.exports = {listGet}
