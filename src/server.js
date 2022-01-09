const { JSDOM } = require('jsdom');
const { window } = new JSDOM();
// Selenium and ChromeDriver
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
// Sleep Function to pause code
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Full Slot main scraper
const fullSlotMainScraper = require('./Scraping Functions/fullSlotMainScraper');

const main = async () => {
  while (true) {
    const start = window.performance.now();
    // Printing in the console that the function is starting the web scraping proccess
    console.log('Starting the main scraper function.');
    try {
      await fullSlotMainScraper(
        chrome,
        Builder,
        By,
        Capabilities,
        sleep,
        until
      );

      /*
        Here we stop the function that measures and we print the time it tooks for
        the functions to return the results
      */
      const stop = window.performance.now();
      console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
    } catch (error) {
      console.log(error);
    }
  }
};

main();
