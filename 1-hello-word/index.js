var express = require('express');
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var port = 3000;

var users = [
		{id: 1, name: 'Đức'},
		{id: 2, name: 'Thúy'},
		{id: 3, name: 'Quyết'}
		];

app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function (request,response) {
	response.render('index', {
		name: "Đức"
	});
})

app.get('/users', function (request,response) {
	response.render('users/index', {
		users: users
	});
})

app.get('/users/search',function (req,res) {
	var q = req.query.q;
	var matchedUsers = users.filter(function (user) {
			return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
	});

	res.render('users/index', {
		users: matchedUsers
	})
})

app.get('/users/create', function (req,res) {
	res.render('users/create')
})

app.post('/users/create', function (req,res) {
	users.push(req.body);
	res.redirect('/users');
})

app.listen(port, function () {
	console.log('Server linsting on  port ' + port);
})