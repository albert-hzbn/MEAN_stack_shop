var mongoose = require('mongoose');
categoriesModel = mongoose.model('Categories');
categoryProductsModel = mongoose.model('CategoryProducts');
productsModel = mongoose.model('Products');



module.exports = function (req, res) {
	var categoryId = req.body.category_id;
	console.log(req.body);
	if (categoryId == undefined)
		categoryId = 0;
	console.log(categoryId);

	categoriesModel
		.find({ 'parent_id': categoryId })
		.exec(function (err, categories) {
			if (err) return handleError(err);

			console.log(categories);
			categoryProductsModel
				.find({ category_id: categoryId })
				.exec(function (err, categoryProducts) {
					if (err) return handleError(err);
					var products = [];
					var productId = [];
					for (var ind = 0; ind < categoryProducts.length; ind++)
						productId.push({ "product_id": categoryProducts[ind].product_id });


					productsModel
						.find({ "$or": productId })
						.exec(function (err, products) {
							//if (err) return handleError(err);
							res.json({
								"categories": categories,
								"products": products
							});
						});


				});
		});
}

/*
var catProObj = {
	getCategoriesFromParent: function (req, res) {
		var categoryId = req.params.id;
		if (categoryId == undefined)
			categoryId = 0;

		categoriesModel
			.find({ parent_id: categoryId })
			.exec(function (err, c) {
				if (err) return handleError(err);
				return c;
			});
	},
	getProductIdsFromCategory: function (categoryId) {
		var categoryId = req.params.id;
		if (categoryId == undefined)
			categoryId = 0;
		categoryProductsModel
			.find({ category_id: categoryId })
			.exec(function (err, cp) {
				if (err) return handleError(err);
				return cp;
			});
	},
	getProductsFromCategory: function (productId) {
		categoryProductsModel
			.find({ product_id: productId })
			.exec(function (err, p) {
				if (err) return handleError(err);
				return p;
			});
	}

};

module.exports = function (req, res) {

	var categoryId = req.params.id;
	if (categoryId == undefined)
		categoryId = 0;

	categoriesModel
		.find({ parent_id: categoryId })
		.exec(function (err, c) {
			if (err) return handleError(err);
			return c;
		});

}*/