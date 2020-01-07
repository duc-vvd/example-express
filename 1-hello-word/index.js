var express = require('express');
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();

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
		users: db.get('users').value()
	});
})

app.get('/users/search',function (req,res) {
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function (item) {

			return item.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
	});

	res.render('users/index', {
		users: matchedUsers
	})
})

app.get('/users/create', function (req,res) {
	res.render('users/create')
})

app.post('/users/create', function (req,res) {
	db.get('users').push(req.body).write();
	res.redirect('/users');
})

app.listen(port, function () {
	console.log('Server linsting on  port ' + port);
})