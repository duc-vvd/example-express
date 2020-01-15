require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');

var db = require('./db');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sesionMiddleware = require('./middlewares/session.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sesionMiddleware);

app.use(express.static('public'));

app.get('/', function (request,response) {
	response.render('index', {
		name: "Đức"
	});
});

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth',authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, function () {
	console.log('Server linsting on  port ' + port);
})