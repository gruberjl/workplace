# SharePoint

Automatic tasks for SharePoint.

## login

logs into SharePoint.

### Parameters

* username: email address to login using.
* password: password used for login.

### Returns

* sp: SharePoint Request https://github.com/s-KaiNet/sp-request

## listGet

Follows people that are following another account

### Parameters

* sp: returned from the sharepoint login
* siteUrl: url to site. Example: 'https://gitbit.sharepoint.com/sites/Marketing'
* listName: Name of list. Example: 'Twitter-Engage-Log'

### Returns

* sharepoint list: info in an object about the sharepoint list. (meta-data)

## listPost

Create a new item in a sharepoint list.

### Parameters

* sp: returned from the sharepoint login
* siteUrl: url to site. Example: 'https://gitbit.sharepoint.com/sites/Marketing'
* listName: Name of list. Example: 'Twitter-Engage-Log'
* item: Object containing the list item with data.

### Returns

* results from the request.
