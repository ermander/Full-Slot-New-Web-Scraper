const closeActiveSections = async (driver, By, sleep) => {
  try {
    const activeSections = await driver.findElements(
      By.className('mg-chiudi-contenitore')
    );

    for (let section of activeSections) {
      await section.click();
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = closeActiveSections;
