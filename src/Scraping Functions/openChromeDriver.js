const openChromeDriver = async (chrome, Capabilities, Builder) => {
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
    return driver;
  } catch (error) {
    console.log(
      `An error occurred inside the openChromeDriver function: ${error}`
    );
  }
};

module.exports = openChromeDriver;
