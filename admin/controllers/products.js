var mongoose = require('mongoose');
categoriesModel = mongoose.model('Categories');
categoryProductsModel = mongoose.model('CategoryProducts');
productsModel = mongoose.model('Products');

module.exports = {
    getProducts: function (req, res) {
        productsModel
            .find()
            .exec(function (err, products) {
                if (err) return handleError(err);
                res.json(products);
            });
    },
    addProduct: function (req, res) {
        var product = req.body;

        var newProduct = new productsModel(product);
        newProduct.save(function (err, p) {
            if (err) return handleError(err);
            console.log("new product", p);
            res.json({
                "message": "Product added"
            });
        });
    },
    updateProduct: function (req, res) {
        var product = req.body;
        productsModel.update(
            { "product_id": product.product_id },
            {
                $set: {
                    "name": product.name,
                    "description": product.description,
                    "quantity": product.quantity,
                    "image": product.image,
                    "price": product.price,
                    "discounted": product.discounted,
                }
            }, function (err, pu) {
                if (err) return handleError(err);
                console.log("Updated product", pu);
                res.json({
                    "message": "Products details updated"
                })
            }
        );
    },
    addCategoriesProduct: function (req, res) {
        var catPro = req.body;
        var message;
        categoryProductsModel
            .findOne(catPro)
            .exec(function (err, catpro) {
                if (err) return handleError(err);

                if (Object.keys(catpro).length === 0) {
                    var newCatPro = new categoryProductsModel(catPro);

                    newCatPro.save(
                        function (err, cp) {
                            if (err) return handleError(err);
                            console.log("new category product relation", cp);
                        }
                    );
                    console.log(newCatPro.speak());
                    message = "Relation added";
                }
                else {
                    message = "This relation is already present";
                }
                res.json({ message });
            });
    },
    removeProduct: function (req, res) {
        var message;
        productsModel.findByIdAndRemove(req.body._id, function (err, todo) {
            if (err)
                message = "An error occured";
            else
                message = "Product removed successfully";
            res.json({ "message": message });
        });
    }
};
