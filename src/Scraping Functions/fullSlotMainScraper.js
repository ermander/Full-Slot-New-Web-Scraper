// Scraping functions
const fullSlotOddsInfoScraper = require('./fullSlotOddsInfoScraper');
const openChromeDriver = require('./openChromeDriver.js');
const openSoccerSection = require('./openSoccerSection.js');

const fullSlotMainScraper = async (
  chrome,
  Builder,
  By,
  Capabilities,
  sleep,
  until
) => {
  try {
    // Setting up and opening chrome driver
    const driver = await openChromeDriver(chrome, Capabilities, Builder);

    // Opening the soccer section
    await openSoccerSection(driver, By, until, sleep);
    // Building the array with all the odds informations
    const fullSlotOdds = await fullSlotOddsInfoScraper(
      driver,
      By,
      until,
      sleep
    );
    // Closing and quitting the chrome driver section
    await driver.close();
    await driver.quit();
    return fullSlotOdds;
  } catch (error) {
    console.log(
      `An error occurred inside the fullSlotMainScraper function: ${error}`
    );
  }
};

module.exports = fullSlotMainScraper;
