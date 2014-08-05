'use strict';
var shipment = {
  dateCreated: {
    type: Date,
    default: new Date()
  },
  trackingNum: {
    type: String,
    required: true
  },
  parts: []
};

module.exports = {
  properties: shipment,
  dataSource: 'db',
  public: true,
  relations: {}
};
