'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CartSchema = new Schema({
  "session_id": String,
  "user_id": Number,
  "products": []
});

CartSchema.methods.speak = function () {
  var greeting = this.one
    ? "Current value " + this.one + "," + this.two
    : "Empty value";
  console.log(greeting);
}

module.exports = mongoose.model('Cart', CartSchema);