# Twit.js

I stopped using the automatic favorite because it was aggressive.

## browse

Opens the browser and logs on as a user. Scrolls through the twitter feed and likes tweets.

### Parameters

* username: Username for twitter login
* password: Password for twitter login

### Returns

* Driver: The selenium-webdriver. The user will still be logged into Twitter.

## engage

Using Twitter's API it will randomly select a tag (related to Office365) and follow + like the user.

### Parameters

* user: Object; User information of the person you'll login as
  * username: Twitter username of the person to login as.
  * consumer_key: Key for the Twitter App.
  * consumer_secret: Secret for the Twitter App.
  * access_token: Access Token for the user / Twitter App.
  * access_token_secret: Access token secret for the user / Twitter app.
* hashtag: (optional) Hashtag to browse for random people to engage with. Exclude the #.

### Returns

Nothing

## loyalist

Using Twitter API will loyaly follow a user: favorite retweets & retweet tweets.

### Parameters

* user: Object; User information of the person you'll login as
  * username: Twitter username of the person to login as.
  * consumer_key: Key for the Twitter App.
  * consumer_secret: Secret for the Twitter App.
  * access_token: Access Token for the user / Twitter App.
  * access_token_secret: Access token secret for the user / Twitter app.
* leaderUsername: Default gruberjl; person to loyaly follow.

### Returns

nothing

## friendsClean

Removes old friends that are not using english, or taking about Office 365.

### Parameters

* user: Object; User information of the person you'll login as
  * username: Twitter username of the person to login as.
  * consumer_key: Key for the Twitter App.
  * consumer_secret: Secret for the Twitter App.
  * access_token: Access Token for the user / Twitter App.
  * access_token_secret: Access token secret for the user / Twitter app.

### Returns

Nothing
