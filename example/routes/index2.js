
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
}
