const { Builder, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Scraping functions
const openChromeDriver = require('./openChromeDriver.js');
const closeInitialActiveSections = require('./closeInitialActiveSections');
const openSoccerSideBar = require('./openSoccerSideBar');
// const fullSlotOddsInfoScraper = require('./fullSlotOddsInfoScraper');
// const openSoccerSection = require('./openSoccerSection.js');

const fullSlotMainScraper = async () => {
  try {
    // Setting up and opening chrome driver
    const driver = await openChromeDriver(chrome, Capabilities, Builder);

    await closeInitialActiveSections(driver);
    await openSoccerSideBar(driver);

    // // Opening the soccer section
    // await openSoccerSection(driver);
    // // Building the array with all the odds informations
    // const fullSlotOdds = await fullSlotOddsInfoScraper(driver);
    // // Closing and quitting the chrome driver section
    // await driver.close();
    // await driver.quit();
    // return fullSlotOdds;
  } catch (error) {
    console.log(
      `An error occurred inside the fullSlotMainScraper function: ${error}`
    );
  }
};

module.exports = fullSlotMainScraper;
