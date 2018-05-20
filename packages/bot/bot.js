const { fork } = require('child_process')
const {resolve} = require('path')
const schedule = require('node-schedule')
process.env.DEBUG ='*'

const onMessage = (debug) => (msg) => {
  if (typeof msg == 'string')
    debug(`Message: ${msg}`)
}

const onClose = (debug) => (code) => {
  debug(`closed with code: ${code}`)
}

const startTwitterPost = () => {
  const debug = require('debug')('twitterPost')
  debug('Starting twitter post')
  const twitterPost = fork('twitter-post')

  twitterPost.on('message', onMessage(debug))

  twitterPost.on('close', onClose(debug))
}

const startRedditBrowse = () => {
  const debug = require('debug')('redditBrowse')
  debug('Starting reddit browser')
  const redditBrowse = fork('reddit-browse')

  redditBrowse.on('message', onMessage(debug))
  redditBrowse.on('close', onClose(debug))
}

const startRedditSubmit = () => {
  const debug = require('debug')('redditSubmit')
  debug('Starting reddit Submit')
  const redditSubmit = fork('reddit-submit')

  redditSubmit.on('message', onMessage(debug))
  redditSubmit.on('close', onClose(debug))
}

const startTwitterUnfriend = () => {
  const debug = require('debug')('twitter-unfriend')
  debug('Starting twitter-unfriend')
  const redditSubmit = fork(resolve(__dirname, '..', 'twitter', 'friends-clean'))

  redditSubmit.on('message', onMessage(debug))
  redditSubmit.on('close', onClose(debug))
}

const start = () => {
  const twitterRule = new schedule.RecurrenceRule()
  twitterRule.dayOfWeek = [new schedule.Range(1, 5)]
  twitterRule.hour = [6, 12, 16]
  twitterRule.minute = 0
  schedule.scheduleJob(twitterRule, startTwitterPost)

  const redditBrowseRule = new schedule.RecurrenceRule()
  redditBrowseRule.hour = new schedule.Range(5, 17)
  redditBrowseRule.minute = 0
  schedule.scheduleJob(redditBrowseRule, startRedditBrowse)

  const redditSubmitRule = new schedule.RecurrenceRule()
  redditSubmitRule.hour = [6, 8, 10, 14, 20]
  redditSubmitRule.minute = 0
  schedule.scheduleJob(redditSubmitRule, startRedditSubmit)

  schedule.scheduleJob('30 8 * * *', startTwitterUnfriend)
}

start()
