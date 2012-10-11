
/**
 * This module processes docs returned from stock service
 */

/**
 * Module dependencies
 */

var bus= require('./bus')

/**
 * Property names of stock doucments we need to convert to float
 */

var props = 'l l_cur c cp el el_cur div yld'.split(' ');

/**
 * Process the response from the webservice
 */

module.exports = exports = function (res) {
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

/**
 * Store docs in mongo
 */

function insert (docs) {
  db.stocks.insert(docs, function (err) {
    if (err)
      return console.error('mongo insert error: ' + err.stack);
    bus.emit('stocks', docs);
  });
}
