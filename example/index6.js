
/**
 * Entry point for our application.
 */

/**
 * 1) create a webserver
 * 2) render static files
 * 3) request logging, routes
 * 4) configuring views, jade
 * 5) custom middleware + rendering passed vals
 * 6) middleware with options
 */

var routes = require('./routes/index3')
var middleware = require('./lib/middleware/middleware2')
var path = require('path')
var express = require('express')
var app = express()

app.configure(function () {
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.bodyParser());
  app.use(middleware({ neat: true }));
})

routes(app);

app.listen(app.get('port'), function () {
  console.log('listening on http://localhost:%d', app.get('port'));
})
