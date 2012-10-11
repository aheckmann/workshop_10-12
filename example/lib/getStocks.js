
module.exports = exports = function getStocks (cb) {
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
    cb(err, result);
  })
}
