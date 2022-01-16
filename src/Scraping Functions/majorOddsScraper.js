const majorOddsScraper = async (driver, By, sleep) => {
  try {
    const oneOdds = [];
    const xOdds = [];
    const twoOdds = [];
    const oneXOdds = [];
    const oneTwoOdds = [];
    const xTwoOdds = [];
    const under2_5Odds = [];
    const over2_5Odds = [];
    const goalOdds = [];
    const noGoalOdds = [];

    let rawOdds = await driver.findElements(
      By.css('li.mg-odd-prematch > span')
    );
    const odds = [];
    for (let i = 0; i < rawOdds.length; i++) {
      if (i % 2 === 1) odds.push(rawOdds[i]);
    }

    for (let i = 0; i < odds.length; i++) {
      if (i % 12 === 0)
        oneOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 1)
        xOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 2)
        twoOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 3)
        oneXOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 4)
        oneTwoOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 5)
        xTwoOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 7)
        under2_5Odds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 8)
        over2_5Odds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 10)
        goalOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
      if (i % 12 === 11)
        noGoalOdds.push(parseFloat(await odds[i].getAttribute('innerText')));
    }
    return (
      oneOdds,
      xOdds,
      twoOdds,
      oneXOdds,
      oneTwoOdds,
      xTwoOdds,
      under2_5Odds,
      over2_5Odds,
      goalOdds,
      noGoalOdds
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = majorOddsScraper;
