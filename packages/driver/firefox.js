const {Builder, By, Key, until} = require('selenium-webdriver');

const build = async () => {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    //await driver.quit();
  }
}

(async function example() {

})();

module.exports = {build}
