# Flipboard

Automatic tasks for flipboard.

## login

logs into Flipboard. will create and open selenium webdriver with user logged in.

### Parameters

* email: email address to login using.
* password: password used for login.

### Returns

* Driver: The selenium-webdriver. Will be logged into Flipboard.

## getUsername

Get the username of the currently logged in user.

## Parameters

* driver: selenium webdriver. must be logged into flipboard

## Returns

* username: string of the flipboard username.

## signup

sign up for flipboard. will create and open selenium webdriver with user logged in.

### Parameters

* username: username to use for the signup.
* password: password used for login.
* email: email address to signup.

### Returns

* Driver: The selenium-webdriver. Will be logged into Flipboard.

## getMagazineFollowers

logs into Flipboard. will create and open selenium webdriver with user logged in.

### Parameters

* driver: selenium webdriver already logged into Flipboard
* url: URL to the flipboard magazine
* numOfPgDowns: Times it should page down before gathering the followers

### Returns

* followers: List of people following magazine

## follow

Follows a flipboard person

### Parameters

* driver: selenium webdriver logged in as user.
* urlToProfileToFollow: url to the person you want to follow.
* flipsToLike: (Integer) deault: 0; number of random flips to like from the person.

### Returns

* driver: selenium webdriver still logged in as user.
