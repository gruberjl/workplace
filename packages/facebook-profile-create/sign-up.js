var webdriver = require('selenium-webdriver')
const {By, until, Key} = webdriver

const createAccount = async (person, password) => {
  var driver = new webdriver.Builder().forBrowser('chrome').build();
  await driver.get('https://www.facebook.com/')
  var elFirst = driver.findElement(By.name('firstname'))
  var elLast = driver.findElement(By.name('lastname'))
  var elEmail = driver.findElement(By.name('reg_email__'))
  var elPass = driver.findElement(By.name('reg_passwd__'))


  await elFirst.sendKeys(person.first)
  await elLast.sendKeys(person.last)
  await elEmail.sendKeys(person.email)
  await elPass.sendKeys(password)

  var elEmailConfirm = driver.findElement(By.name('reg_email_confirmation__'))
  await elEmailConfirm.sendKeys(person.email)

  await driver.findElement(By.css(`#month>option[value="${person.birthmon}"]`)).click()
  await driver.findElement(By.css(`#day>option[value="${person.birthday}"]`)).click()
  await driver.findElement(By.css(`#year>option[value="${person.birthyear}"]`)).click()

  if (person.sex == "Male") {
    await driver.findElement(By.css(`input[name="sex"][value="2"]`)).click()
  } else {
    await driver.findElement(By.css(`input[name="sex"][value="1"]`)).click()
  }

  await driver.findElement(By.name('websubmit')).click()
  await driver.sleep(3000)

  await driver.quit()
}

const createAll = async (people, password) => {
  for (i = 0; i < people.length; i++) {
    if (people[i].facebook != 'TRUE') {
      await createAccount(people[i], password)
    }
  }
}



module.exports = {createAccount, createAll}
