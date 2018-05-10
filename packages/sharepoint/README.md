# SharePoint

Automatic tasks for SharePoint.

**Expects a file called lib\people.js with the following content**
```JavaScript
module.exports = {
  username: 'Username@gitbit.org',
  password: ''
}

```

## login

logs into SharePoint.

### Parameters

* username: email address to login using.
* password: password used for login.

### Returns

* sp: SharePoint Request https://github.com/s-KaiNet/sp-request

## listGet

Gets items from a SP list.

### Parameters

* sp: returned from the sharepoint login
* siteUrl: url to site. Example: 'https://gitbit.sharepoint.com/sites/Marketing'
* listName: Name of list. Example: 'Twitter-Engage-Log'

### Returns

* sharepoint list: info in an object about the SharePoint list. (meta-data)

## listPost

Create a new item in a sharepoint list.

### Parameters

* sp: returned from the sharepoint login
* siteUrl: url to site. Example: 'https://gitbit.sharepoint.com/sites/Marketing'
* listName: Name of list. Example: 'Twitter-Engage-Log'
* item: Object containing the list item with data.

### Returns

* results from the request.

## People.get

Returns an array of all the items in the People list

### Parameters

* none
