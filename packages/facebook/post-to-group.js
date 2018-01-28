const {By, Key} = require('selenium-webdriver')

const postToGroup = async (driver, groupUrl, message) => {
	if (!driver) throw 'Facebook/post-to-group: Driver is required'
	if (!groupUrl) throw 'Facebook/post-to-group: groupUrl is required'
	if (!message) throw 'Facebook/post-to-group: message is required'

	await driver.get(groupUrl)

	const textBox = await driver.findElement(By.name('xhpc_message_text'))
	await textBox.click()
	await driver.sleep(1000)

	const editBox = await driver.findElement(By.className('_5rpu'))
	await editBox.sendKeys(message)
	await driver.sleep(3000)
	// await body.sendKeys(Key.RETURN)
}

module.exports = {postToGroup}
