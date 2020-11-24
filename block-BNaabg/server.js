var http = require('http');
var fs = require('fs');
var url = require('url')
var userPath = __dirname + '/users/'



var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        if(req.method === "POST" && pathname === "/users") {
            var username = JSON.parse(store).username
            // console.log(username)
            fs.open(userPath + username + '.json', "wx", (err, fd) => {
                if(err) {
                    res.end('<h3>Username is not availabe</h3>');
                }
                fs.writeFile(fd, store, (err) => {
                    if(err) return console.log(err);
                    fs.close(fd, (err) => {
                        if(err) return console.log(err);
                        res.end(`${username} created successfully`)
                    })
                })
            })
        }
        // READ FILE
        if (req.method === "GET" && parsedUrl.pathname === "/users") {
            var username = parsedUrl.query.username;
            fs.readFile(userPath + username + ".json", (err, content) => {
                if (err) res.end(JSON.stringify(err));
                res.end(content);
            });
        } 
        // DELETE FILE
        if (req.method === "DELETE" && parsedUrl.pathname === "/users") {
            fs.unlink(userPath + username + ".json", (err) => {
                if (err) res.end(JSON.stringify(err));
                res.end(`${username}.json successfully deleted`);
            });
        } 

        // UDPATE
        if (req.method === "PUT" && parsedUrl.pathname === "/users") {
            fs.open(userPath + username + ".json", "r+", (err, fd) => {
                if (err) res.end(JSON.stringify(err));
                fs.ftruncate(fd, (err) => {
                    if (err) res.end(JSON.stringify(err));
                    fs.writeFile(fd, store, (err) => {
                        if (err) res.end(json.stringify(err));
                        fs.close(fd, (err) => {
                            if (err) res.end(json.stringify(err));
                            res.end(`${username} successfully updated`);
                        });
                    });
                });
            });
        }
        res.end(`404 Page not found`);
    })
}

server.listen(4000, 'localhost', () => {
    console.log('server listening on port 4000')
});