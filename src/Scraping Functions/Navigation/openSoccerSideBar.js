const { By, until } = require('selenium-webdriver')
// Scraping functions
const openTournaments = require('./openTournaments')

const openSoccerSideBar = async (driver) => {
  try {
    const sidebar = await driver.wait(
      until.elementLocated(By.id('palinsesto-prematch-container'))
    )
    const closeInEvidenzaSection = await sidebar.findElement(
      By.id('nav-inevidenza')
    )
    await closeInEvidenzaSection.click()
    const soccerSection = await sidebar.findElement(By.id('category-1'))
    await soccerSection.click()

    await openTournaments(driver, sidebar)
  } catch (error) {
    console.log(error)
  }
}

module.exports = openSoccerSideBar
