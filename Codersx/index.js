var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/users', userRoute);

app.get('/', function (req, res) {
	res.render('index', {name : 'Đức'});
});

app.listen(port, function () {
	console.log("Server listening on: " + port);
});