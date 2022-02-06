const axios = require('axios');

const postFullSlotNewOdds = (data) =>
  axios
    .post(
      'https://mybet21-fullslotnew-be.herokuapp.com/odds/post-full-new-slot-odds',
      data
    )
    .then((res) => console.log(`FullSlotNew POST Request: ${res.data}`))
    .catch((err) => console.log(`FullSlotNew POST Request: ${err.data}`));

const postBetfairOdds = (data) =>
  axios
    .post(
      'https://mybet21-fullslotnew-be.herokuapp.com/odds/post-betfair-exchange-odds',
      data
    )
    .then((res) => console.log(`Betfair POST Request: ${res.data}`))
    .catch((err) => console.log(`Betfair POST Request: ${err.data}`));

module.exports = {
  postFullSlotNewOdds,
  postBetfairOdds
};
