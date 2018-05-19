const { fork } = require('child_process')
const schedule = require('node-schedule')
process.env.DEBUG ='*'

const startTwitterPost = () => {
  const debug = require('debug')('twitterPost')
  debug('Starting twitter post')
  const twitterPost = fork('twitter-post')

  twitterPost.on('message', (msg) => {
    if (typeof msg == 'string')
      debug(`Message: ${msg}`)
  })

  twitterPost.on('close', (code) => {
    debug(`twitter post complete with code ${code}`)
  })
}

const start = () => {
  const rule = new schedule.RecurrenceRule()
  rule.dayOfWeek = [new schedule.Range(1, 5)]
  rule.hour = [6, 12, 16]
  rule.minute = 0

  schedule.scheduleJob(rule, startTwitterPost)
}

start()
