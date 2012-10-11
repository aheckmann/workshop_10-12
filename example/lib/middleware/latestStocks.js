
/**
 * Listens for the latest stocks event, adds them
 * to the request object.
 */

/**
 * Module dependencies
 */

var bus = require('../bus')

/**
 * Latest stocks
 */

var latest = [];

/**
 * Listen for !stocks
 */

bus.on('stocks', function (stocks) {
  if (Array.isArray(stocks))
    latest = stocks;
})

module.exports = exports = function () {
  return function (req, res, next) {
    req.latestStocks = latest;
    next()
  }
}
