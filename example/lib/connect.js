
/**
 * Establish a connection to mongodb and start the
 * app server.
 */

/**
 * Module dependencies
 */

var mongo = require('mongodb')
var bus = require('./bus')

/**
 * Expose
 */

module.exports = exports = function (app) {
  var mongoOptions = { db: { safe: true }}

  mongo.Db.connect(app.set('mongo uri'), mongoOptions, function (err, db) {
    if (err) {
      console.error(err.stack);
      return process.exit(1);
    }

    console.log('connected to mongo: %s', app.set('mongo uri'));

    // exposed
    global.db = db;
    db.stocks = db.collection('stocks');

    app.on('close', function () {
      db.close();
      bus.emit('shutdown');
    })

    app.listen(app.get('port'), function () {
      console.log('app listening on http://localhost:%d', app.get('port'));
      bus.emit('running');
    })
  })
}
