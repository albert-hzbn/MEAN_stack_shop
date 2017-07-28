var mongoose = require('mongoose');
categoriesModel = mongoose.model('Categories');

module.exports = {
    getCategories: function (req, res) {
        categoriesModel
            .find()
            .exec(function (err, categories) {
                if (err) return handleError(err);
                res.json(categories);
            });
    },
    addCategory: function (req, res) {
        var category = req.body;
        var message;
        categoriesModel
            .find(category)
            .exec(function (err, cArr) {
                if (err) return handleError(err);
                if (cArr.length === 0) {
                    var newCategory = new categoriesModel(category);
                    newCategory.save(function (err, c) {
                        if (err) return handleError(err);
                        console.log("new category", c);
                        message = "Category added";

                    });
                }
                else
                    message = "Category already present";

                res.json({ "message": message });
            });
    },
    updateCategory: function (req, res) {
        var category = req.body;
        console.log(category);
        categoriesModel.update(
            { "category_id": category.category_id },
            {
                $set: {
                    "name": category.name,
                    "image": category.image,
                    "parent_id": category.parent_id,
                }
            }, function (err, pu) {
                if (err) return handleError(err);
                console.log("Updated category", pu);
                res.json({
                    "message": "Category details updated"
                })
            }
        );
    },
    removeCategory: function (req, res) {
        var message;
        categoriesModel.findByIdAndRemove(req.body._id, function (err, todo) {
            if (err)
                message = "An error occured";
            else
                message = "Category removed successfully";
            res.json({ "message": message });
        });
    }
};
