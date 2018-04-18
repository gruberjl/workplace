# Pinterest

Automatic tasks for Pinterest.

## login

logs into Pinterest.

### Parameters

* email: email address to login using.
* password: password used for login.
* driver: (optional) selenium webdriver to use to login to Pinterest.

### Returns

* Driver: The selenium-webdriver. Will be logged into Pinterest.

## follow

Follows people that are following another account

### Parameters

* driver: selenium webdriver that's logged into Pinterest.
* account: Default microsoft; Pinterest account of a person that has follwers with similiar interests that you want to follow.
* followersToAdd: default 100; number of people to start following.

### Returns

* driver: selenium webdriver
