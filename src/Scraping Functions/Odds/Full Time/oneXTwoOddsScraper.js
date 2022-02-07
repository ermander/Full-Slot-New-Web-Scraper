const { By, until } = require('selenium-webdriver')

const oneXTwoOddsScraper = async (driver) => {
  try {
    const one = []
    const x = []
    const two = []

    const containers = await driver.wait(
      until.elementsLocated(By.className('betgrp-container betgrp-612'))
    )

    for (let container of containers) {
      const odds = await container.findElements(
        By.className('mg-quota-prematch')
      )

      for (let i = 0; i < odds; i++) {
        switch (i % 6) {
          case 1:
            one.push(await odds[i].getAttribute('innerText'))
            break
          case 3:
            x.push(await odds[i].getAttribute('innerText'))
            break
          case 5:
            two.push(await odds[i].getAttribute('innerText'))
            break
          default:
            break
        }
      }
    }

    return one, x, two
  } catch (error) {
    console.log(error)
  }
}

module.exports = oneXTwoOddsScraper
