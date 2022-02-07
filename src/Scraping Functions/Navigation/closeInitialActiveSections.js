const { By, until } = require('selenium-webdriver')

const closeInitialActiveSections = async (driver) => {
  try {
    const closeSectionButton = await driver.wait(
      until.elementsLocated(By.className('mg-chiudi-contenitore'))
    )
    for (let button of closeSectionButton) {
      await button.click()
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = closeInitialActiveSections
