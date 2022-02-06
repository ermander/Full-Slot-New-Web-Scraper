const { By } = require('selenium-webdriver');
const nationNames = require('../Utils/nationNames');

const openTournaments = async (driver, sidebar) => {
  const nations = await sidebar.findElements(
    By.className('accordion-content mg-palinsesto-nazione')
  );

  for (let nation of nations) {
    const nationName = await nation.findElements(By.css('span'));

    if (nationNames[await nationName[0].getAttribute('innerText')]) {
      let checkIfIsLoading = true;
      while (checkIfIsLoading) {
        try {
          await driver.findElement(
            By.className('mg-caricamento-eventi-maschera mg-maschera-prematch')
          );
        } catch (error) {
          checkIfIsLoading = false;
          if (
            (await nation.getAttribute('class')) !==
            'accordion-content mg-palinsesto-nazione mg-palinsesto-nazione-open'
          ) {
            await driver.executeScript(
              'arguments[0].scrollIntoView(true);',
              nation
            );
            await nation.click();

            const openAllTournamentsButton = await nation.findElement(
              By.className('openall')
            );

            await driver.executeScript(
              'arguments[0].scrollIntoView(true);',
              openAllTournamentsButton
            );
            await openAllTournamentsButton.click();
          } else {
            checkIfIsLoading = false;
            await driver.executeScript(
              'arguments[0].scrollIntoView(true);',
              nation
            );
            await nation.click();

            const openAllTournamentsButton = await nation.findElement(
              By.className('openall')
            );

            await driver.executeScript(
              'arguments[0].scrollIntoView(true);',
              openAllTournamentsButton
            );
            await openAllTournamentsButton.click();
          }
        }
      }
    }
  }
};

module.exports = openTournaments;
