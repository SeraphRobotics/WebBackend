'use strict';
var cartridgeCredit = {
  custId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  batchId: {
    type: Number
  }
};

module.exports = {
  properties: cartridgeCredit,
  dataSource: 'db',
  public: true,
  relations: {}
};
