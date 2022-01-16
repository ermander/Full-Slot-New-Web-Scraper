const { JSDOM } = require('jsdom');
const { window } = new JSDOM();
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
// Full Slot main scraper
const fullSlotMainScraper = require('./Scraping Functions/fullSlotMainScraper');
const fetchBetfairOdds = require('./Betfair/index.js');
const sleep = require('./Utils/sleep.js');

const main = async () => {
  while (true) {
    const start = window.performance.now();
    console.log('Starting the main scraper function.');
    try {
      const fullSlotOdds = await fullSlotMainScraper(
        chrome,
        Builder,
        By,
        Capabilities,
        sleep,
        until
      );

      // Posting FullSlotNew Odds to BE
      const postFullSlotNewResponse = await axios.post(
        'https://mybet21-fullslotnew-be.herokuapp.com/odds/post-full-new-slot-odds',
        fullSlotOdds
      );
      console.log(`FullSlotNew POST Request: ${postFullSlotNewResponse.data}`);

      // Featching Betfair Exchange Odds from API
      const betfairOdds = await fetchBetfairOdds(fullSlotOdds);

      // Posting
      const postBetfairResponse = await axios.post(
        'https://mybet21-fullslotnew-be.herokuapp.com/odds/post-betfair-exchange-odds',
        betfairOdds
      );
      console.log(`Betfair POST Request: ${postBetfairResponse.data}`);

      // Printing on the console the time needed for all the operation
      const stop = window.performance.now();
      console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
    } catch (error) {
      console.log(error);
    }
  }
};

main();
