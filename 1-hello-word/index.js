var express = require('express');
var app = express();

var port = 3000;

app.get('/', function (request,response) {
	response.send('<h1>Hello word</h1><a href="/users">User list</a>');
})

app.get('/users', function (request,response) {
	response.send('User list');
})

app.listen(port, function () {
	console.log('Server linsting on  port ' + port);
})