var db = require('../db');

module.exports.index = function(req, res) {
	var page = parseInt(req.query.p ? req.query.p : 1);
	var perPage = 8;
	var begin = perPage*(page - 1);
	var end = perPage * page;
	var products = db.get('products').value();
	var pageMax = Math.ceil(products.length / perPage);
	res.render('products/index', {
		products: products.slice(begin,end),
		page: page,
		pageMax: pageMax
	});
}