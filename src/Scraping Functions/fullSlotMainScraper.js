// Scraping functions
const fullSlotOddsInfoScraper = require('./fullSlotOddsInfoScraper');
const nations = require('../Utils/nation.js');

const fullSlotMainScraper = async (
  chrome,
  Builder,
  By,
  Capabilities,
  sleep,
  until
) => {
  try {
    // Creating the chrome options
    const options = new chrome.Options(); //.headless();
    options.windowSize({ width: 1500, height: 850 });
    // Setting the strategies of the page load
    const caps = new Capabilities();
    caps.setPageLoadStrategy('normal');

    // Initiating selenium web driver
    let driver = await new Builder()
      .withCapabilities(caps)
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    // Opening Selenium
    await driver.manage().window();

    await driver.get('https://www.fullslotnew.it/scommesse-sportive');

    // Clicco sul navigatore nel calcio
    const navigator = await driver.wait(
      until.elementLocated(By.id('mg-navigator-link'))
    );
    await navigator.click();
    // Clicco tutte le date disponibili
    const avaiableDates = await driver.wait(
      until.elementLocated(By.className('mg-navigator-cta-int'))
    );
    const dateButtons = await avaiableDates.findElements(By.css('a'));
    for (let dateButton of dateButtons) {
      await dateButton.click();
      await sleep(100);
    }
    // Clicco tutti i campionati disponibili
    const soccerNavigator = await driver.wait(
      until.elementLocated(By.id('mg-navigator-catid-1'))
    );
    const checkBox = await soccerNavigator.findElement(
      By.id('check-category-1')
    );
    await checkBox.click();

    // Clicco il bottone per avviare il caricamento delle quote
    const goToOdds = await driver.wait(
      until.elementLocated(By.id('mg-navigator-cta-go'))
    );
    await goToOdds.click();

    // Waiting untill the odds are loaded
    await sleep(1000);
    let isLoading = true;
    while (isLoading) {
      try {
        await driver.findElement(By.id('mg-maschera-scommesse-prematch'));
        await sleep(200);
      } catch (error) {
        isLoading = false;
      }
    }

    // Closing all the unnecessary torunaments
    const titlesContainers = await driver.wait(
      until.elementsLocated(
        By.className(
          'mg-contenitore-sport sport-calcio sport-cat-1 mg-contenitore-compatto'
        )
      )
    );

    for (let titleContainer of titlesContainers) {
      let title = await titleContainer.findElement(By.css('span.country-name'));
      title = await title.getAttribute('innerText');
      if (title !== nations[title]) {
        const closeContainer = await titleContainer.findElement(
          By.css('span.mg-chiudi-contenitore > i')
        );
        await closeContainer.click();
      }
      await sleep(200);
    }

    // Opening all the avaiable tournaments
    const openAllTournamentsButton = await driver.wait(
      until.elementLocated(By.id('minMaxAllComposite'))
    );
    await openAllTournamentsButton.click();

    // Building the array with all the odds informations
    const fullSlotOdds = await fullSlotOddsInfoScraper(
      driver,
      By,
      until,
      sleep
    );

    await driver.close();
    await driver.quit();
    return fullSlotOdds;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = fullSlotMainScraper;
