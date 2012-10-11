
module.exports = exports = function (app) {
  app.get('/', function (req, res, next) {
    res.end('hello world');
  })
}
