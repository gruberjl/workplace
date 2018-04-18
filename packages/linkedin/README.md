# LinkedIn

Automatic tasks for LinkedIn.

## login

logs into LinkedIn. will create and open selenium webdriver if it isn't provided.

### Parameters

* email: email address to login using.
* password: password used for login.
* driver: (optional) selenium webdriver to use to login to LinkedIn.

### Returns

* Driver: The selenium-webdriver. Will be logged into LinkedIn.

## connect

automatically sends connect requests to people.

### Parameters

* driver: selenium webdriver that's logged into LinkedIn.

### Returns

* Driver: The selenium-webdriver. Still logged into LinkedIn.

## postToGroup

Posts a message to a LinkedIn group. User posting must be a member of the group.

### Parameters

* driver: selenium webdriver with user already logged in.
* groupUrl: URL to the group to post the message.
* title: The title to post to the group.
* message: The message to post to the group.

### Returns

Nothing

## getCompany

Gets information about a company

### Parameters

* driver: selenium webdriver with user already logged in.
* url: url to the company to get information from

### Returns

* companyInfo: Object
  * title: Title of the company
  * followersCount: number of people following company
  * url: url to the company website
  * companyId: LinkedIn ID of the company
  * people: Object - list of employees at the company
    * name: Name of employee
    * title: Job Title
    * location: Physical location; typically region where person lives & works
    * link: url to the person's LinkedIn profile
    * canConnect: If the currently logged in person can connect to the person. A number of things can block the connection for example, if they are already connected or if the person's connection request is locked down.

## connectTo

Connect to a person

### Parameters

* driver: selenium webdriver with user already logged in.
* url: url to the person you want to connect to

### Results

* driver: selenium webdriver
