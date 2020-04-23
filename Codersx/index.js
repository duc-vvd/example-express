var express = require('express');
var app = express();
var fs = require('fs');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
	res.render('index', {name : 'Đức'});
});

app.get('/users', function (req, res) {
	res.render('users/index', {
		users: [
			{id: 1, name: 'Đức'},
			{id: 2, name: 'Thúy'}
		]
	});
})

app.listen(port, function () {
	console.log("Server listening on: " + port);
});