var express = require('express');
var cookieParser = require('cookie-parser');

var db = require('./db');

var userRoute = require('./routes/user.route');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', function (request,response) {
	response.render('index', {
		name: "Đức"
	});
});

app.use('/users',userRoute);

app.listen(port, function () {
	console.log('Server linsting on  port ' + port);
})