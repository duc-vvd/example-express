var express = require('express');
var app = express();
var fs = require('fs');

var port = 3000;

app.get('/', function (request, response) {
	response.send("Hello CodersX!")
});

app.listen(port, function () {
	console.log("Server listening on: " + port);
});