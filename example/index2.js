
/**
 * Entry point for our application.
 */

/**
 * 1) create a webserver
 * 2) render static files
 */

var path = require('path')
var express = require('express')
var app = express()

app.configure(function () {
  app.set('port', process.env.PORT || 8000);
  app.use(express.static(path.join(__dirname, 'public')));
})

app.listen(app.get('port'), function () {
  console.log('listening on http://localhost:%d with static files', app.get('port'));
})
