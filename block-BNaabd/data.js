var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var dataFormat = req.headers['content-type']
    var capturedData = "";
    req.on("data", (chunk) => {
        capturedData += chunk;
    });
    req.on("end", () => {
        if(dataFormat === 'application/json') {
            var parsedData = JSON.parse(capturedData);
            res.end(capturedData)
        }
        else if(dataFormat === 'application/x-www-form-urlencoded') {
            var parsedData = qs.parse(capturedData);
            res.end(JSON.stringify(parsedData));
        }
       
    })

    
}

server.listen(7000, 'localhost', () => {
    console.log('server is listening on the port 7000') 
})