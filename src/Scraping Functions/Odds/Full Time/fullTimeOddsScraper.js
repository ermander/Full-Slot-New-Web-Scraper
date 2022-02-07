const { By, until } = require('selenium-webdriver')
const oneXTwoOddsScraper = require('./oneXTwoOddsScraper')
const underOver2_5OddsScraper = require('./underOver2_5OddsScraper')
const goalNoGoalOddsScraper = require('./goalNoGoalOddsScraper')

const fullTimeOddsScraper = async (driver) => {
  try {
    const oneXTwoOdds = await oneXTwoOddsScraper(driver)
    const underOver2_5Odds = await underOver2_5OddsScraper(driver)
    const goalNoGoalOdds = await goalNoGoalOddsScraper(driver)
  } catch (error) {
    console.log(error)
  }
}

module.exports = fullTimeOddsScraper

// betgrp-container betgrp-612 1X2
// betgrp-container betgrp-37 DC
// betgrp-container betgrp-3430 under/over 2.5
// betgrp-container betgrp-103 gg ng
