const { By, until } = require('selenium-webdriver');

const underOver2_5Odds = async (driver) => {
  const under2_5 = [];
  const over2_5 = [];

  const containers = await driver.wait(
    until.elementsLocated(By.className('betgrp-container betgrp-3430'))
  );

  for (let container of containers) {
    const odds = await container.findElements(
      By.className('mg-quota-prematch')
    );

    for (let i = 0; i < odds; i++) {
      switch (i % 4) {
        case 1:
          under2_5.push(await odds[i].getAttribute('innerText'));
          break;
        case 3:
          over2_5.push(await odds[i].getAttribute('innerText'));
          break;
        default:
          break;
      }
    }
  }
  return { under2_5, over2_5 };
};

module.exports = underOver2_5Odds;
