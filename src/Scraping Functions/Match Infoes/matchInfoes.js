const { By, until } = require('selenium-webdriver')
const teamNamesScraper = require('./teamNamesScraper')
const datesScraper = require('./datesScraper')

const matchInfoes = async (driver) => {
  try {
    const teamNames = await teamNamesScraper(driver)
    const dates = await datesScraper(driver)
  } catch (error) {
    console.log(`An error occurred inside the matchInfoes function: ${error}`)
  }
}

module.exports = matchInfoes
