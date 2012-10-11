
var http = require('http')

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello node + mongodb workshop');
}).listen(8000);

console.log('http server listening on http://localhost:%d', 8000);
console.log('CTRL+C to exit');

