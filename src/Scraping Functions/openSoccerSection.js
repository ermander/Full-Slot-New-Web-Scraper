const nations = require('../Utils/nation.js');
const { By, until } = require('selenium-webdriver');
const sleep = require('../Utils/sleep');

const openSoccerSection = async (driver) => {
  try {
    // Opening the soccer navigator
    const navigator = await driver.wait(
      until.elementLocated(By.id('mg-navigator-link'))
    );
    await navigator.click();
    // Clicking on all the avaiable dates
    const avaiableDates = await driver.wait(
      until.elementLocated(By.className('mg-navigator-cta-int'))
    );
    const dateButtons = await avaiableDates.findElements(By.css('a'));
    for (let dateButton of dateButtons) {
      await dateButton.click();
      await sleep(100);
    }
    // Clicking on all the avaiable tournaments
    const soccerNavigator = await driver.wait(
      until.elementLocated(By.id('mg-navigator-catid-1'))
    );
    const checkBox = await soccerNavigator.findElement(
      By.id('check-category-1')
    );
    await checkBox.click();

    // Loading all the match by opening.
    const goToOdds = await driver.wait(
      until.elementLocated(By.id('mg-navigator-cta-go'))
    );
    await goToOdds.click();

    // Waiting untill the odds are loaded
    await sleep(1000);
    let isLoading = true;
    while (isLoading) {
      try {
        await driver.findElement(By.id('mg-maschera-scommesse-prematch'));
        await sleep(200);
      } catch (error) {
        isLoading = false;
      }
    }

    // Closing all the unnecessary torunaments
    const titlesContainers = await driver.wait(
      until.elementsLocated(
        By.className(
          'mg-contenitore-sport sport-calcio sport-cat-1 mg-contenitore-compatto'
        )
      )
    );
    for (let titleContainer of titlesContainers) {
      let title = await titleContainer.findElement(By.css('span.country-name'));
      title = await title.getAttribute('innerText');
      if (title !== nations[title]) {
        const closeContainer = await titleContainer.findElement(
          By.css('span.mg-chiudi-contenitore > i')
        );
        await closeContainer.click();
      }
      await sleep(200);
    }

    // Opening all the avaiable tournaments
    const openAllTournamentsButton = await driver.wait(
      until.elementLocated(By.id('minMaxAllComposite'))
    );
    await openAllTournamentsButton.click();
  } catch (error) {
    console.log(
      `An error occurred inside the openSoccerSection function: ${error}`
    );
  }
};

module.exports = openSoccerSection;
