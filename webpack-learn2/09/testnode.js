const http = require('http');
const server = http.createServer(function (req, res) {
});
server.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});
console.log(44)