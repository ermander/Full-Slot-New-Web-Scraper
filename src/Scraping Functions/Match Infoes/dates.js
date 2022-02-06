const { By, until } = require('selenium-webdriver');

const dates = async (driver) => {
  const dates = await driver.wait(until.elementsLocated(By.css('')));
};

module.exports = dates;
