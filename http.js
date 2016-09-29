
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');

var dirPath;
const projectName;

var endings = {
    '.css': 'stylesheet.css',
    '.js': 'script.js'
}


var server = http.createServer(function(request, response) {
    var method = request.method;
    var url = request.url;
    var headers = request.headers;
    request.on('error', function(err) {
        throw(err);
    });

//const projectName = url.slice(10);

    if (method!=='GET') {
        throw('Please change the method to GET');
    }

    var pathToFile = url;

    if (url.indexOf(".")===-1) {
//        const dirPath = "projects" + pathToFile + "/";

        fs.readdir(__dirname + url, function (err, data) {
            if(err) {
                console.log("No such dir");
                return;
            }
            var files = data;
            console.log(files);

        });


        response.writeHead(200, {
            'Content-Type': 'text/html'
        });

        var readStream = fs.createReadStream(__dirname + url + "/" + "index.html");
        console.log('inside indexOf' + __dirname + url)
        readStream.pipe(response);
    }

//if ()
//for (var i=0; i<files.length;i++) {
//    if endings[path.extname(url)]
//}

if (path.extname(url)==='.css') {
    console.log(url)
    response.setHeader('Content-Type', 'text/css');
    readStream = fs.createReadStream(__dirname + url);
    readStream.pipe(response);
//"/projects/hangman/" + "stylesheet.css"

}





});


server.listen('8080');
