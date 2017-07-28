'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategoryProductSchema = new Schema({
  "category_id":Number,
  "product_id":Number
});

CategoryProductSchema.methods.speak = function () {
  var greeting = this.one
    ? "Current value " + this.one + "," + this.two
    : "Empty value";
  console.log(greeting);
}

module.exports = mongoose.model('CategoryProducts', CategoryProductSchema);