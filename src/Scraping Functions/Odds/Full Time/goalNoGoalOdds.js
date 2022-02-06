const { By, until } = require('selenium-webdriver');

const goalNoGoalOdds = async (driver) => {
  const goal = [];
  const noGoal = [];

  const containers = await driver.wait(
    until.elementsLocated(By.className('betgrp-container betgrp-103'))
  );

  for (let container of containers) {
    const odds = await container.findElements(
      By.className('mg-quota-prematch')
    );

    for (let i = 0; i < odds; i++) {
      switch (i % 4) {
        case 1:
          goal.push(await odds[i].getAttribute('innerText'));
          break;
        case 3:
          noGoal.push(await odds[i].getAttribute('innerText'));
          break;
        default:
          break;
      }
    }
  }
  return { goal, noGoal };
};

module.exports = goalNoGoalOdds;
