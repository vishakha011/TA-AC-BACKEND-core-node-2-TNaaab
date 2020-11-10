var http = require('http');
var fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    fs.createReadStream('./readme.txt').pipe(res);

}

server.listen(3000, 'localhost', () => {
    console.log('server is listeniing on port 3000')
})