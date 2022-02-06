const { Builder, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Scraping functions
const openChromeDriver = require('./Navigation/openChromeDriver.js');
const closeInitialActiveSections = require('./Navigation/closeInitialActiveSections');
const openSoccerSideBar = require('./Navigation/openSoccerSideBar');
const fullTimeOdds = require('./Odds/Full Time/fullTimeOdds');
const matchInfoes = require('./Match Infoes/matchInfoes');
// const fullSlotOddsInfoScraper = require('./fullSlotOddsInfoScraper');
// const openSoccerSection = require('./openSoccerSection.js');

const fullSlotMainScraper = async () => {
  try {
    // Setting up and opening chrome driver
    const driver = await openChromeDriver(chrome, Capabilities, Builder);

    await closeInitialActiveSections(driver);
    await openSoccerSideBar(driver);
    await fullTimeOdds(driver);
    await matchInfoes(driver);

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
