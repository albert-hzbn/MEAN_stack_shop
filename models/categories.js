'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
  "category_id":{ type: Number, required: true },
  "name": String,
  "image": String,
  "parent_id":Number
});

CategorySchema.methods.speak = function () {
  var greeting = this.one
    ? "Current value " + this.one + "," + this.two
    : "Empty value";
  console.log(greeting);
}

module.exports = mongoose.model('Categories', CategorySchema);