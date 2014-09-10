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
  items: {
    type: [],
    default: []
  }
};

module.exports = {
  properties: shipment,
  dataSource: 'db',
  public: true,
  relations: {
    order: {
      type: 'belongsTo',
      model: 'order'
    }
  }
};
