const { fork } = require('child_process')
// const schedule = require('node-schedule')
const chalk = require('chalk')

const startTwitterPost = () => {
  const twitterPost = fork('twitter-post')

  twitterPost.on('message', (msg) => {
    console.log('Message from child', msg)
  })

  twitterPost.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

const start = () => {
  console.log('Starting twitterPost')
  startTwitterPost()

}

start()
