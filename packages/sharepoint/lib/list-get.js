const listGet = async (sp, siteUrl, listName, affix, raw) => {
  const response = await sp.get(`${siteUrl}/_api/web/lists/GetByTitle('${listName}')/items?${affix}`)

  if (!raw) {
    response.body.d.results.forEach((result) => {
      delete result.__metadata
      delete result.FirstUniqueAncestorSecurableObject
      delete result.RoleAssignments
      delete result.Activities
      delete result.AttachmentFiles
      delete result.ContentType
      delete result.GetDlpPolicyTip
      delete result.FieldValuesAsHtml
      delete result.FieldValuesAsText
      delete result.FieldValuesForEdit
      delete result.File
      delete result.Folder
      delete result.LikedByInformation
      delete result.ParentList
      delete result.Properties
      delete result.Versions
      delete result.FileSystemObjectType
      delete result.ServerRedirectedEmbedUri
      delete result.ServerRedirectedEmbedUrl
      delete result.ContentTypeId
      delete result.ComplianceAssetId
      delete result.OData__UIVersionString
      delete result.Attachments
    })
  }

  return response.body.d.results
}

module.exports = {listGet}
