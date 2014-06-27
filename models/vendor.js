"use strict";
var Vendor = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
};

module.exports = {
  properties: Vendor,
  dataSource: 'db',
  public: true,
  relations: {}
};