
var fs = require('fs');
var Handlebars = require('handlebars');
var obj;
var arr=[];
var arrOfProjects;


var files = fs.readdirSync(__dirname + '/projects');

for (var i=0;i<files.length;i++) {
    obj={};
    obj.name=files[i];
    obj.link= '/projects/' + files[i] + "/";
    arr[i] = obj;
}

arrOfProjects = {
    arrOfProjects: arr
};



var file = fs.readFileSync(__dirname + '/projects.handlebars', 'utf-8');
var template = Handlebars.compile(file);
var html = template(arrOfProjects);

module.exports = html;
