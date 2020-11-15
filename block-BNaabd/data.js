var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    // var dataFormat = req.headers['content-type']
    var capturedData = "";
    req.on("data", (chunk) => {
        capturedData += chunk;
    });
    req.on("end", () => {
        if(req.method === "POST" && req.url === "/json") {
            res.setHeader('Content-Type', 'application/json')
            res.end(capturedData);
            console.log(capturedData)
        }
        else if(req.method === "POST" && req.url === "/form") {
            var parsedData = qs.parse(capturedData);
            res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
            res.end(JSON.stringify(parsedData));
            console.log(capturedData)
        }
       
    });

    
}

server.listen(7000, 'localhost', () => {
    console.log('server is listening on the port 7000') 
})