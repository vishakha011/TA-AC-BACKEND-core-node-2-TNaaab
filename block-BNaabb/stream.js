var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var capturedData = "";
    req.on("data", (chunk) => {
        capturedData += chunk;
    });
    req.on("end", () => {
        console.log(capturedData);
        res.writeHead(200, {'content-Type' : 'text/plain'})
        res.write(capturedData)
        res.end();
    })

    
}

server.listen(3456, 'localhost', () => {
    console.log('server is listening on the port 3456')
})