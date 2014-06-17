"use strict";
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    model     = mongoose.model,
    ObjectId  = Schema.ObjectId;

var VendorOrderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  orderNum: {
    type: Number,
    required: true,
    unique: true
  },
  compOrder: [
    {
      partNum: Number,
      quantity: Number
    }
  ],
  CompReceived: [
    {
      partNum: Number,
      dateReceived: Date
    }
  ]
});

module.exports = mongoose.model('vendorOrder', VendorOrderSchema);