
/**
 * Entry point for our application.
 */

/**
 * 1) create a webserver
 */

var express = require('express')
var app = express()

// all environments
app.configure(function () {
  app.set('port', process.env.PORT || 8000);
})

// production
app.configure('production', function () {
  app.set('port', process.env.PORT || 80);
})

app.listen(app.get('port'), function () {
  console.log('listening on http://localhost:%d', app.get('port'));
})
