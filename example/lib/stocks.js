
/**
 * Periodically poll a stocks service
 * Store the documents in MongoDB
 */

/**
 * Module dependencies
 */

var request = require('superagent')
var mongo = require('mongodb')
var bus = require('./bus')

/**
 * Stocks resource
 */

var stockUrl = "http://www.google.com/finance/info?client=ig&q=";

/**
 * Stocks we want to track
 */

var symbols = process.env.WORKSHOP_STOCKS || 'goog,aapl,msft';

/**
 * Polling interval in seconds
 */

var interval = process.env.WORKSHOP_POLL_INTERVAL || 5;

/**
 * Exposed to this module only
 */

var app;
module.exports = exports = function (app_) {
  app = app_;
  bus.on('running', init);
}

/**
 * Poll management
 */

function init () {
  getstocks();
  setInterval(getstocks, interval * 1000);
}

/**
 * Hit the webservice
 */

function getstocks () {
  var url = stockUrl + symbols;

  var req = request(url);

  req.on('error', function (err) {
    console.error('getstocks: '+ err.stack);
  });

  req.end(function (res) {
    if (!res.ok) {
      return console.error('getstocks: bad response');
    }

    console.log('got', res.text);
  });
}
