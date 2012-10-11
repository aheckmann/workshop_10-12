/**
 * Module dependencies
 */

var getStocks = require('../lib/getStocks')

/**
 * Routes
 */

module.exports = exports = function (app) {
  app.get('/', function (req, res, next) {
    res.end('hello world');
  })

  app.get('/jade', function (req, res, next) {
    res.render('hello')
  })

  app.get('/jade2', function (req, res, next) {
    res.render('hello2')
  })

  app.get('/jade3', function (req, res, next) {
    res.render('hello3', { token: req.token })
  })

  app.get('/stocks', function (req, res, next) {
    getStocks(function (err, stocks) {
      if (err) return next(err);

      stocks = Array.isArray(stocks) && stocks || [];

      // formatted output based on Accept header
      res.format({
          html: function () {
            res.render('stocks', { stocks: stocks });
          }
        , json: function () {
            res.send({ stocks: stocks });
          }
      });
    })
  })
}
