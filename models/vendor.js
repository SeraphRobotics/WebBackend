"use strict";
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var Vendor = new Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Vendor', Vendor);