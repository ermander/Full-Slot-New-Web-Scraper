const { By, until } = require('selenium-webdriver');
// Scraping functions
const openTournaments = require('./openTournaments');

const openSoccerSideBar = async (driver) => {
  const sidebar = await driver.wait(
    until.elementLocated(By.id('palinsesto-prematch-container'))
  );
  const soccerSection = await sidebar.findElement(By.id('category-1'));
  await soccerSection.click();

  await openTournaments(driver, sidebar);
};

module.exports = openSoccerSideBar;
