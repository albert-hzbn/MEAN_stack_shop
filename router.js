module.exports = function (app) {

	var cart = require("./shop/controllers/cart");
	var categories = require("./shop/controllers/categories-products");

	var adminCategories = require("./admin/controllers/categories");
	var adminProducts = require("./admin/controllers/products");

	app.route('/api/categories')
		.post(categories);

	app.route('/api/addtocart')
		.post(cart.addCart);

	app.route('/api/removefromcart')
		.post(cart.removeCart);


	app.route('/admin/categories/getproducts')
		.get(adminCategories.getCategories);

	app.route('/admin/categories/addcategory')
		.post(adminCategories.addCategory);

	app.route('/admin/categories/updatecategory')
		.post(adminCategories.updateCategory);

	app.route('/admin/categories/removecategory')
		.post(adminCategories.removeCategory);

	app.route('/admin/products/getproducts')
		.get(adminProducts.getProducts);

	app.route('/admin/products/addproduct')
		.post(adminProducts.addProduct);

	app.route('/admin/products/addcategoriesproduct')
		.post(adminProducts.addCategoriesProduct);

	app.route('/admin/products/updateproduct')
		.post(adminProducts.updateProduct);
};