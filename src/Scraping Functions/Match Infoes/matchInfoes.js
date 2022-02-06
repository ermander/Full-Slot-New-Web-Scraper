const { By, until } = require('selenium-webdriver');
const teamNames = require('./teamNames');

const matchInfoes = async (driver) => {
  const teamNames = await teamNames(driver);
  const dates = await dates(driver);
};

module.exports = matchInfoes;
