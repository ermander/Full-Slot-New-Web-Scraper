const { By, until } = require('selenium-webdriver');
const teamNamesScraper = require('./teamNamesScraper');
const datesScraper = require('./datesScraper');

const matchInfoes = async (driver) => {
  const teamNames = await teamNamesScraper(driver);
  const dates = await datesScraper(driver);
};

module.exports = matchInfoes;
