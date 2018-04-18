# Facebook

Automatic tasks for facebook.

## login

logs into facebook. will create and open selenium webdriver if it isn't provided.

### Parameters

* email: email address to login using.
* password: password used for login.
* driver: (optional) selenium webdriver to use to login to facebook.

### Returns

* Driver: The selenium-webdriver. Will be logged into facebook.

## sendFriendRequests

automatically sends friend requests to people. Can require X number of mutal friends to send a friend request.

### Parameters

* driver: selenium webdriver that's logged into Facebook.
* requiredMutualFriends: Default 10; Number of mutal friends required before sending a friend request.

### Returns

* Driver: The selenium-webdriver. Still logged into facebook.

## postToGroup

Posts a message to a facebook group. User posting must be a member of the group.

### Parameters

* driver: selenium webdriver with user already logged in.
* groupUrl: URL to the group to post the message.
* message: The message to post to the group.

### Returns

Nothing

## signUp

Signs up a user for facebook. **Doesn't work because Facebook has a difficult anti-bot system.**

### Parameters

* person: Object
  * first: First name
  * last: Last name
  * email: email address
  * birthmon: Birth month (integer) 1-12
  * birthday: (integer) day of birth 1-31
  * birthyear: 4 digital birth year
  * sex: Male || Female
* password: Password to use for the account
