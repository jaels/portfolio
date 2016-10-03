
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

var ext;


var endings = {
    'css': 'text/css',
    'js': 'text/js',
    'jpg': 'image/jpeg'
};


var server = http.createServer(function(request, response) {
    var method = request.method;
    var url = request.url;
    request.on('error', function(err) {
        throw(err);
    });

    if(path.dirname(url)==='/') {
        var page = require("./projectPage");
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.write(page);
        response.end();
        return;
    }


    if (method!=='GET') {
        throw('Please change the method to GET');
    }


    if (path.dirname(url)==='/projects') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        var readStream = fs.createReadStream(__dirname + url + "/" + "index.html");
        readStream.pipe(response);
    }



    if (path.extname(url) && path.extname(url)!=='.ico' ) {
        ext = path.extname(url).slice(1);
        response.setHeader('Content-Type', endings[ext]);
        readStream = fs.createReadStream(__dirname + url);
        console.log(__dirname + url);
        readStream.pipe(response);

    }


});


server.listen('8080');
