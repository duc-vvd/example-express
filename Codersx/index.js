var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var shortid = require('shortid');

var adapter = new FileSync('db.json')
var db = low(adapter)

db.defaults({users: []})
	.write();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
	res.render('index', {name : 'Đức'});
});

app.get('/users', function (req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
})

app.get('/users/search', function (req, res) {
	var q = req.query.q.toLowerCase();
	var matchedUsers = db.get('users').value().filter(function (user) {
		return user.name.toLowerCase().indexOf(q) > -1;
	});

	res.render('users/index', {
		users: matchedUsers
	})
})

app.get('/users/create', function (req, res) {
	res.render('users/create');
})

app.get('/users/:id', function (req, res) {
	var id = req.params.id;
	res.render('users/view', {
		user: db.get('users').find({id: id}).value()
	})
})

app.post('/users/create', function (req, res) {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
})

app.listen(port, function () {
	console.log("Server listening on: " + port);
});