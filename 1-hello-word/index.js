var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function (request,response) {
	response.render('index', {
		name: "Đức"
	});
})

app.get('/users', function (request,response) {
	response.render('users/index', {
		users: [
		{id: 1, name: 'Đức'},
		{id: 2, name: 'Thúy'}
		]
	});
})

app.listen(port, function () {
	console.log('Server linsting on  port ' + port);
})