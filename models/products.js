'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  "product_id":{ type: Number, required: true },
  "name": String,
  "description":String,
  "quantity": Number,
  "image":String,
  "price":Number,
  "discounted":Number
});

ProductSchema.methods.speak = function () {
  var greeting = this.one
    ? "Current value " + this.one + "," + this.two
    : "Empty value";
  console.log(greeting);
}

module.exports = mongoose.model('Products', ProductSchema);