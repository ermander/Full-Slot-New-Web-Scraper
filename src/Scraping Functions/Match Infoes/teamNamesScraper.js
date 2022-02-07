const { By, until } = require('selenium-webdriver')

const teamNamesScraper = async (driver) => {
  try {
    const home = []
    const away = []
    const teams = driver.wait(until.elementsLocated(By.className('team')))
    for (let i = 0; i < teams.length; i++) {
      switch (i % 2) {
        case 0:
          home.push(teams[i].getAttribute('innerText'))
          break
        case 1:
          away.push(teams[i].getAttribute('innerText'))
          break
        default:
          break
      }
    }

    return home, away
  } catch (error) {
    console.log(error)
  }
}

module.exports = teamNamesScraper
