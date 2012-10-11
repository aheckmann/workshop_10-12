
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
 * Property names of stock doucments we need to convert to float
 */

var props = 'l l_cur c cp el el_cur div yld'.split(' ');

/**
 * Expose
 */

module.exports = exports = function () {
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

  req.end(handleResponse);
}

/**
 * Process the response from the webservice
 */

function handleResponse (res) {
  if (!res.ok) {
    return console.error('getstocks: bad response');
  }

  var json;
  try {
    json = JSON.parse(res.text.substring(3));

    // give numbers proper types
    json.forEach(function (doc) {
      props.forEach(function (prop) {
        doc[prop] = parseFloat(doc[prop] || 0);
      })
    })

  } catch (err) {
    return console.error('getstocks:', err.stack);
  }

  insert(json);
}

function insert (json) {
  console.log(json);
}
