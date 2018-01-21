const {random} = require('./index')

const start = async () => {
  await random()
  console.log('done')
}

start()
