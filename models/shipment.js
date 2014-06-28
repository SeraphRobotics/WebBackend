"use strict";
var shipment = {
  shipmentNum: {
    id: true,
    type: Number
  },
  dateCreated: {
    type: Date,
    default: new Date()
  },
  trackingNum: {
    type: String
  },
  parts: [
    Number
  ]
};

module.exports = {
  properties: shipment,
  dataSource: 'db',
  public: true,
  relations: {}
};