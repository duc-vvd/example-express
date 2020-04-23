var express = require('express');
var app = express();
var fs = require('fs');

var port = 3000;

app.get('/', function (request, response) {
	response.send('<h1>Hello CodersX!</h1><a href="/users">User List</a>')
});

app.get('/users', function (req, res) {
	res.send('User list');
})

app.listen(port, function () {
	console.log("Server listening on: " + port);
});