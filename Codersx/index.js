var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddleware = require('./middlewares/auth.middleware');

var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.get('/', function (req, res) {
	console.log(req.cookies);
	res.render('index', {name : 'Đức'});
});

app.listen(port, function () {
	console.log("Server listening on: " + port);
});