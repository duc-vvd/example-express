var db = require('../db');
var md5 = require('md5');

module.exports.login = function (req, res) {
	res.render('auth/login');
};

module.exports.postLogin = function (req, res) {
	var email = req.body.email;
	var hashPassword = md5(req.body.password);
	var user = db.get('users').find({email: email}).value();

	if(!user){
		res.render('auth/login', {
			errors: ['Email does not exist!']
		});
	}

	if(user.password !== hashPassword) {
		res.render('auth/login', {
			errors: ['Wrong password!']
		})
	}
	res.cookie('userId', user.id);

	res.redirect('/users');
}