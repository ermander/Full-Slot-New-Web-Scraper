const closeActiveSections = require('../Utils/closeActiveSections');
const nationsToSelect = require('../Utils/nation');

const nationsContainerScraper = async (driver, By) => {
  try {
    const nationsContainer = await driver.findElements(
      By.className('accordion-content mg-palinsesto-nazione')
    );

    const openAllMatches = await driver.findElements(
      By.className('filters-openall filters-today-odds')
    );

    const nationNames = [];
    for (let nation of nationsContainer) {
      const nationName = await nation.findElement(By.css('h4 > span'));
      nationNames.push(await nationName.getAttribute('innerText'));
    }

    for (let nation of nationsContainer) {
      if (nation !== 'accordion-content mg-palinsesto-nazione') {
        await nation.click();
      }
    }

    for (let nation of nationNames) {
      console.log('Entro');
      if (nation === nationsToSelect[nation]) {
        const index = nationsContainer.indexOf(nation);
        console.log(index);
        await openAllMatches[index].click();
      }
    }
    return nationsContainer;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = nationsContainerScraper;
