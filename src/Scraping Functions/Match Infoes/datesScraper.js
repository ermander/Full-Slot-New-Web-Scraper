const { By, until } = require('selenium-webdriver');

const datesScraper = async (driver) => {
  const dates = [];
  const containers = await driver.wait(
    until.elementsLocated(
      By.className(
        'mg-nome-atomico-prematch  betgrp-612 betgrp-37 betgrp-3430 betgrp-103'
      )
    )
  );

  for (let container of containers) {
    let date = await container.getAttribute('data-datesort');
    date = date.slice(0, 9);
    date = new Date(parseInt(date));
    console.log(date);
    dates.push(date);
  }
  return dates;
};

module.exports = datesScraper;
