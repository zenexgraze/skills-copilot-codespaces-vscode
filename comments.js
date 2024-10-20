// create web server

var http = require('http');
var url = require('url');
var fs = require('fs');

// create server
http.createServer( function (request, response) {
    // parse request
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // read file
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data.toString());
        }
        response.end();
    });
}).listen(8080);

console.log('Server running at http://');