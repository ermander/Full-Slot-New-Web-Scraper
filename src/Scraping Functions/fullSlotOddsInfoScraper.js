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
    console.log(rows.length);
    let i = 0;
    // Extracting the informations
    for (let row of rows) {
      await sleep(200);
      console.log(i);
      i += 1;
      const date = await row.getAttribute('data-datesort');
      const teams = await row.findElements(By.className('team'));
      const [home, away] = [
        await teams[0].getAttribute('innerText'),
        await teams[1].getAttribute('innerText'),
      ];

      const oddsInfo = await row.findElements(
        By.css('div.betgrp-container > ul > li')
      );

      if (oddsInfo.length === 12) {
        odds.push({
          date,
          home,
          away,
          oneOdd:
            (await oddsInfo[0].getAttribute('innerText')) !== '-'
              ? await oddsInfo[0].getAttribute('innerText')
              : '0',
          xOdd:
            (await oddsInfo[1].getAttribute('innerText')) !== '-'
              ? await oddsInfo[1].getAttribute('innerText')
              : '0',
          twoOdd:
            (await oddsInfo[2].getAttribute('innerText')) !== '-'
              ? await oddsInfo[2].getAttribute('innerText')
              : '0',
          under2_5Odd:
            (await oddsInfo[6].getAttribute('innerText')) !== '-'
              ? await oddsInfo[6].getAttribute('innerText')
              : '0',
          over2_5Odd:
            (await oddsInfo[7].getAttribute('innerText')) !== '-'
              ? await oddsInfo[7].getAttribute('innerText')
              : '0',
          goalOdd:
            (await oddsInfo[10].getAttribute('innerText')) !== '-'
              ? await oddsInfo[10].getAttribute('innerText')
              : '0',
          noGoalOdd:
            (await oddsInfo[11].getAttribute('innerText')) !== '-'
              ? await oddsInfo[11].getAttribute('innerText')
              : '0',
        });
      }
    }
    console.log(odds);

    return odds;
  } catch (error) {
    console.log(error);
  }
};

module.exports = fullSlotOddsInfoScraper;
