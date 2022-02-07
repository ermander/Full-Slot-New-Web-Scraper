const { By, until } = require('selenium-webdriver')
const nationNames = require('../../Utils/nationNames')
const fullTimeOddsScraper = require('../Odds/Full Time/fullTimeOddsScraper')
const matchInfoes = require('../Match Infoes/matchInfoes')

const openTournaments = async (driver, sidebar) => {
  try {
    const nations = await sidebar.findElements(
      By.className('accordion-content mg-palinsesto-nazione')
    )

    for (let nation of nations) {
      const nationName = await nation.findElements(By.css('span'))

      if (nationNames[await nationName[0].getAttribute('innerText')]) {
        let checkIfIsLoading = true
        while (checkIfIsLoading) {
          try {
            await driver.findElement(
              By.className(
                'mg-caricamento-eventi-maschera mg-maschera-prematch'
              )
            )
          } catch (error) {
            checkIfIsLoading = false
            if (
              (await nation.getAttribute('class')) !==
              'accordion-content mg-palinsesto-nazione mg-palinsesto-nazione-open'
            ) {
              await driver.executeScript(
                'arguments[0].scrollIntoView(true);',
                nation
              )

              await nation.click()

              const openAllTournamentsButton = await nation.findElement(
                By.className('openall')
              )

              await driver.executeScript(
                'arguments[0].scrollIntoView(true);',
                openAllTournamentsButton
              )
              await openAllTournamentsButton.click()

              await fullTimeOddsScraper(driver)
              await matchInfoes(driver)
              const closeAllSections = await driver.wait(
                until.elementLocated(By.id('closeAllComposite'))
              )
              await closeAllSections.click()
              await driver.executeScript(
                'arguments[0].scrollIntoView(true);',
                nation
              )

              await nation.click()
            } else {
              checkIfIsLoading = false
              await driver.executeScript(
                'arguments[0].scrollIntoView(true);',
                nation
              )
              await nation.click()

              const openAllTournamentsButton = await nation.findElement(
                By.className('openall')
              )

              await driver.executeScript(
                'arguments[0].scrollIntoView(true);',
                openAllTournamentsButton
              )
              await openAllTournamentsButton.click()
              await fullTimeOddsScraper(driver)
              await matchInfoes(driver)

              const closeAllSections = await driver.wait(
                until.elementLocated(By.id('closeAllComposite'))
              )
              await closeAllSections.click()
              await driver.executeScript(
                'arguments[0].scrollIntoView(true);',
                nation
              )

              await nation.click()
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = openTournaments
