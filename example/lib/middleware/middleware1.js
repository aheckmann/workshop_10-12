
module.exports = exports = function (req, res, next) {
  var token = req.query.t || '';
  req.token = token;
  next();
}
