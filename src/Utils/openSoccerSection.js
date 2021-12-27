const openSoccerSection = async (driver, By, sleep) => {
  try {
    const soccerContainer = await driver.findElement(By.id('category-1'));
    await soccerContainer.click();
    return soccerContainer
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = openSoccerSection;
