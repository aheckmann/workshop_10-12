
var pipeline = [
    { $project: { _id: 1, l_cur: 1 }}
  , { $group: {
        _id: 't'
      , avg: { $avg: '$l_cur' }
      , min: { $min: '$l_cur' }
      , max: { $max: '$l_cur' }
    }}
]

var docs = db.stocks.aggregate(pipeline);
printjson(docs)
