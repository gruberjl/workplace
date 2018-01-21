const spoof = require('spoof')
const os = require('os')

const random = () => {
  const interfaces = spoof.findInterfaces()

  interfaces.forEach((inter) => {
    spoof.setInterfaceMAC(inter.device, spoof.random(), inter.port)
  })
}

module.exports = {random}
