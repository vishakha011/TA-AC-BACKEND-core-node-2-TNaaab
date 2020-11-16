var path = require('path');
var http = require('http');
var qs = require('querystring')


// absolute path of `server.js`
console.log(__dirname);

//  absolute path of `app.js`
console.log(path.join(__dirname, 'app.js'));

// absolute path of `index.html`
// console.log(path.relative( './index.html'));

// absolute path of `index.html`
console.log(path.join(__dirname, 'index.html'));


var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var capturedData = '';
    req.on('data', (chunk) => {
        capturedData += chunk;
    });

    req.on('end', () => {
        if(req.method === "POST" && req.url === "/") {
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(capturedData)
            console.log(req.headers['content-type'])
        }
        else if(req.method === "POST" && req.url === "/form") {
            res.writeHead(201, {'Content-Type': 'application/x-www-form-urlencoded'});
            var parsedData = qs.parse(capturedData);
            // console.log(parsedData.captain)
            res.end(parsedData.captain)
            console.log(req.headers['content-type'])
        }
    })
    
}

server.listen(3000, 'localhost', ()=> {
    console.log('server is listening on the port 3000')
})


var server2 = http.createServer(reqHandler);

function reqHandler(req, res) {
	var contentType = req.headers["content-type"];

	var data = "";

	req.on("data", (chunk) => {
		data += chunk;
	});

	req.on("end", () => {
		if (contentType === "application/x-www-form-urlencoded") {
			const parsedJSON = qs.parse(data);
			res.end(JSON.stringify(parsedJSON));
		} else if (contentType === "application/json") {
			res.end(data);
		} 
	});
}

server2.listen(9000, () => {
	console.log("server is listening on the port 9000");
});


var server3 = http.createServer(handleRequest);

function handleRequest(req, res) {
    var capturedData = '';
    req.on('data', (chunk) => {
        capturedData += chunk;
    });

    req.on('end', () => {
        if(req.method === "POST" && req.url === "/") {
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(capturedData)
            console.log(req.headers['content-type'])
        }
        else if(req.method === "POST" && req.url === "/form") {
            res.writeHead(201, {'Content-Type': 'application/x-www-form-urlencoded'});
            var parsedData = qs.parse(capturedData);
            // console.log(parsedData.captain)
            res.end(parsedData.captain)
            console.log(req.headers['content-type'])
        }
    })
    
}

server3.listen(6000, 'localhost', ()=> {
    console.log('server is listening on the port 6000')
})


var server4 = http.createServer(reqHandler);

function reqHandler(req, res) {
	var contentType = req.headers["content-type"];

	var data = "";

	req.on("data", (chunk) => {
		data += chunk;
	});

	req.on("end", () => {
		if (contentType === "application/x-www-form-urlencoded") {
			const parsedJSON = qs.parse(data);
			res.end(JSON.stringify(parsedJSON));
		} else if (contentType === "application/json") {
			res.end(data);
		} 
	});
}

server4.listen(5000, () => {
	console.log("server is listening on the port 5000");
});