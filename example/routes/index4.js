
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
    // aggregation

    var pipeline = [
        { $project: { t: 1, l_cur: 1 }}
      , { $group: {
            _id: '$t'
          , avg: { $avg: '$l_cur' }
          , min: { $min: '$l_cur' }
          , max: { $max: '$l_cur' }
        }}
    ]

    db.stocks.aggregate(pipeline, function (err, result) {
      if (err) return next(err);
      result = Array.isArray(result) && result || [];
      res.render('stocks', { stocks: result });
    })
  })
}
