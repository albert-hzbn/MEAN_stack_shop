var mongoose = require('mongoose');
cartModel = mongoose.model('Cart');

module.exports = {

    addCart: function (req, res) {
        var sessionId = req.body.session_id;
        var productId = req.body.product_id;

        console.log(sessionId, productId)
        /* var thing = new cartModel({
             "session_id":"new session",
             "product_id":5
         });
         thing.save();*/
        cartModel
            .findOne({ "session_id": sessionId })
            .exec(function (err, cart) {
                if (err) return handleError(err);

                var found = false, index;
                //Checks if product is already present in cart
                for (var i = 0; i < cart.products.length; i++) {
                    if (cart.products[i].product_id == productId) {
                        found = true;
                        index = i;
                        break;
                    }
                }

                /*If item is present in array increase quantity by one and update database
                else increase the quantity by one*/
                if (found) {
                    cart.products[index].quantity += 1;
                    cartModel.update(
                        { "session_id": sessionId },
                        {
                            $set: {
                                "products": cart.products
                            }
                        }, function (err, numAffected) {
                            if (err) return handleError(err);
                        }
                    );
                }
                else {
                    cart.products.push({
                        "product_id": productId,
                        "quantity": 1
                    })
                    cart.save();
                }
                res.json(cart);
            });
    },
    removeCart: function (req, res) {
        var sessionId = req.body.session_id;
        var productId = req.body.product_id;

        cartModel
            .findOne({ "session_id": sessionId })
            .exec(function (err, cart) {
                if (err) return handleError(err);

                var index;

                //Checks if product is already present in cart
                for (var i = 0; i < cart.products.length; i++) {
                    if (cart.products[i].product_id == productId) {
                        index = i;
                        break;
                    }
                }

                //If quantiy is one remove item from array else decrease the quantity by one
                if (cart.products[index].quantity == 1)
                    cart.products.splice(index, 1);
                else
                    cart.products[index].quantity -= 1;
                cartModel.update(
                    { "session_id": sessionId },
                    {
                        $set: {
                            "products": cart.products
                        }
                    }, function (err, numAffected) {
                        if (err) return handleError(err);
                    }
                );

                res.json(cart);
            });

    }
}

