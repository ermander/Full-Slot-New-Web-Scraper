const closePreferedGames = async (driver, By, sleep) => {
  try {
    const preferedGames = await driver.findElement(
      By.className('accordion-toggle hvr-bounce-to-right')
    );
    await preferedGames.click();
    await sleep(200);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = closePreferedGames;
