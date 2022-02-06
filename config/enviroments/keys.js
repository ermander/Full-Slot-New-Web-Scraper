if (process.env.NODE_ENV === 'production') {
  console.log('Running on production mode');
  module.exports = require('./prod.js');
} else if (process.env.NODE_ENV === 'staging') {
  console.log('Running on staging mode');
  module.exports = require('./staging.js');
} else {
  console.log('Running on dev mode');
  module.exports = require('./dev.js');
}
