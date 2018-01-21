const spoof = require('spoof')
const WiFiControl = require('wifi-control')

const random = () => new Promise((res) => {
  const interfaces = spoof.findInterfaces()

  interfaces.forEach((inter) => {
    spoof.setInterfaceMAC(inter.device, spoof.random(), inter.port)
  })

  WiFiControl.resetWiFi(res)
})

module.exports = {random}
