
module.exports = exports = function (options) {
  options || (options = {});
  return function (req, res, next) {
    var token = req.query.t || '';
    req.token = (options.neat ? 'neat-' : '') + token;
    next();
  }
}
