
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');

var ext;

var files;

var endings = {
    'css': 'text/css',
    'js': 'text/js',
    'jpg': 'image/jpeg',
}


var server = http.createServer(function(request, response) {
    var method = request.method;
    var url = request.url;
    var headers = request.headers;
    request.on('error', function(err) {
        throw(err);
    });


//    fs.stat(__dirname + url, function(err,stats) {
//        if(err) {
//            console.log(err);
//            return;
//        }

//        if (stats.isDirectory() && url[url.length-1]!=="/") {
//url=url+"/";
//        }

//    });



    if (method!=='GET') {
        throw('Please change the method to GET');
    }


    fs.readdir(__dirname + url, function (err, data) {
        if(err) {
            console.log(err);
            return;
        }
        var files = data;
    });


    if (url.indexOf(".")===-1) {

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
