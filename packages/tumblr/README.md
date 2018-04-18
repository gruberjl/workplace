# Tumblr

Automatic tasks for Tumblr.

## login

logs into Tumblr. You must be logged in to Google already.

### Parameters

* email: email address to login using.
* password: password used for login.
* driver: (optional) selenium webdriver to use to login to Tumblr.

### Returns

* Driver: The selenium-webdriver. Will be logged into Tumblr.

## follow

Follows people that are following another account

### Parameters

* driver: selenium webdriver that's logged into Tumblr.
* account: Default microsoft; Tumblr account of a person that has follwers with similiar interests that you want to follow.
* followersToAdd: default 100; number of people to start following.

### Returns

* driver: selenium webdriver
