var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring')

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url);
    var pathname = parsedUrl.pathname;
    var dataFormat = req.headers['content-type'];
    
    var capturedData = "";
    req.on('data', (chunk) => {
        capturedData += chunk;
    })

    req.on('end', () => {
        if(req.method === "GET" && pathname === "/form") {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./form.html').pipe(res)
        }
        else if(req.method === "POST" && dataFormat === "application/x-www-form-urlencoded") {
            var parsedData = qs.parse(capturedData);
            res.writeHead(200, {'Content-Type' : 'text/html'});
            let username = parsedData.name
            let email = parsedData.email;
            let age = parsedData.age;
            res.write(`<h2>Name : ${username}</h2>
            <h2>Email : ${email}</h2>
            <h2>Age : ${age}</h2>` )
            res.end();
        }
        else {
            res.writeHead(404, {'Content-Type' : 'text/html'});
            res.end('<h2>Page Not Found</h2>')
        }
    })
}

server.listen(5678, 'localhost', () => {
    console.log('server is listening on port 5678')
});