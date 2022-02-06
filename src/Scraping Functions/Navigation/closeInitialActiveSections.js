const { By, until } = require('selenium-webdriver');

const closeInitialActiveSections = async (driver) => {
  const closeSectionButton = await driver.wait(
    until.elementsLocated(By.className('mg-chiudi-contenitore'))
  );
  for (let button of closeSectionButton) {
    await button.click();
  }
};

module.exports = closeInitialActiveSections;
