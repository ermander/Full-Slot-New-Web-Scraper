const { By, until } = require('selenium-webdriver');
const oneXTwoOdds = require('./oneXTwoOdds');
const underOver2_5Odds = require('./underOver2_5Odds');
const goalNoGoalOdds = require('./goalNoGoalOdds');

const fullTimeOdds = async (driver) => {
  const oneXTwoOdds = await oneXTwoOdds(driver);
  const underOver2_5Odds = await underOver2_5Odds(driver);
  const goalNoGoalOdds = await goalNoGoalOdds(driver);
};

module.exports = fullTimeOdds;

// betgrp-container betgrp-612 1X2
// betgrp-container betgrp-37 DC
// betgrp-container betgrp-3430 under/over 2.5
// betgrp-container betgrp-103 gg ng
