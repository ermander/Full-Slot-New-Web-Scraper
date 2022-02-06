const { By, until } = require('selenium-webdriver');

const openSoccerSideBar = async (driver) => {
  const sidebar = await driver.wait(
    until.elementLocated(By.id('palinsesto-prematch-container'))
  );
};

module.exports = openSoccerSideBar;
