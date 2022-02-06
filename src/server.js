const { JSDOM } = require('jsdom');
const { window } = new JSDOM();

// Full Slot main scraper
const fullSlotMainScraper = require('./Scraping Functions/fullSlotMainScraper');
const fetchBetfairOdds = require('./Betfair/index.js');
require('dotenv').config();
const { postFullSlotNewOdds, postBetfairOdds } = require('../services/api');

const main = async () => {
  while (true) {
    const start = window.performance.now();
    console.log('Starting the main scraper function.');
    try {
      const fullSlotOdds = await fullSlotMainScraper();

      // Posting FullSlotNew Odds to BE
      postFullSlotNewOdds(fullSlotOdds);

      // Featching Betfair Exchange Odds from API
      const betfairOdds = await fetchBetfairOdds(fullSlotOdds);

      // Posting
      postBetfairOdds(betfairOdds);

      // Printing on the console the time needed for all the operation
      const stop = window.performance.now();
      console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
    } catch (error) {
      console.log(error);
    }
  }
};

main();
