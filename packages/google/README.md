# Google

Automatic tasks for Google.

## login

Login to Google (gmail)

### Parameters

* email: email address to login using.
* password: password used for login.
* driver: (optional) selenium webdriver to use to login to google.

### Returns

* Driver: The selenium-webdriver. Will be logged into google.

## postToGroup

Post a message to a Google Plus group. User must be logged in and a member of the Google Plus group.

### Parameters

* driver: selenium webdriver with user already logged in.
* groupUrl: URL to the group to post the message.
* message: The message to post to the group.

### Returns

Nothing
