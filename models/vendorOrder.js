"use strict";
var VendorOrder = {
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
  partsOrdered: [
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
};
module.exports = {
  properties: VendorOrder,
  dataSource: 'db',
  public: true,
  relations: {}
};