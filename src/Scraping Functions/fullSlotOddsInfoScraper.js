const fullSlotOddsInfoScraper = async (driver, By, until, sleep) => {
  try {
    const odds = [];
    const rows = [];

    // Finding all the rows with the informations
    const fakeRows = await driver.wait(
      until.elementsLocated(By.css('ul.mg-nome-atomico-prematch'))
    );

    // Saving only the raws with the corret informations
    for (let fakeRow of fakeRows) {
      if (
        (await fakeRow.getAttribute('class')) !==
        'mg-nome-atomico-prematch mg-prematch-market'
      )
        rows.push(fakeRow);
    }
    let i = 0;

    // Extracting the informations
    console.log(rows.length);
    for (let row of rows) {
      console.log(i);
      await sleep(200);
      i += 1;
      const date = await row.getAttribute('data-datesort');
      const teams = await row.findElements(By.className('team'));
      const [home, away] = [
        await teams[0].getAttribute('innerText'),
        await teams[1].getAttribute('innerText')
      ];

      const oddsInfo = await row.findElements(
        By.css('div.betgrp-container > ul > li')
      );

      if (oddsInfo.length === 12) {
        odds.push({
          name: `${home} - ${away}`,
          date,
          home,
          away,
          oneOdd:
            (await oddsInfo[0].getAttribute('innerText')) !== '-'
              ? parseFloat(await oddsInfo[0].getAttribute('innerText'))
              : 0,
          xOdd:
            (await oddsInfo[1].getAttribute('innerText')) !== '-'
              ? parseFloat(await oddsInfo[1].getAttribute('innerText'))
              : 0,
          twoOdd:
            (await oddsInfo[2].getAttribute('innerText')) !== '-'
              ? parseFloat(await oddsInfo[2].getAttribute('innerText'))
              : 0,
          under2_5Odd:
            (await oddsInfo[6].getAttribute('innerText')) !== '-'
              ? parseFloat(await oddsInfo[6].getAttribute('innerText'))
              : 0,
          over2_5Odd:
            (await oddsInfo[7].getAttribute('innerText')) !== '-'
              ? parseFloat(await oddsInfo[7].getAttribute('innerText'))
              : 0,
          goalOdd:
            (await oddsInfo[10].getAttribute('innerText')) !== '-'
              ? parseFloat(await oddsInfo[10].getAttribute('innerText'))
              : 0,
          noGoalOdd:
            (await oddsInfo[11].getAttribute('innerText')) !== '-'
              ? parseFloat(await oddsInfo[11].getAttribute('innerText'))
              : 0
        });
      }
    }

    return odds;
  } catch (error) {
    console.log(error);
  }
};

module.exports = fullSlotOddsInfoScraper;
