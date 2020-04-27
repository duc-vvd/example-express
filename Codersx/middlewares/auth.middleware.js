var db = require('../db');

module.exports.requireAuth = (req, res, next) => {
	var userId = req.cookies.userId;
	var user = db.get('users').find({id: userId}).value();

	if(!userId) {
		res.redirect('/auth/login');
	}

	if(!user) {
		res.redirect('/auth/login');
	}

	next();
};