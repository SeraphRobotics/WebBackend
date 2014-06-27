"use strict";
var order = {
  orderNum: {
    type: Number,
    id: true
  },
  custId: {
    type: Number,
    required: true
  },
  orderType: String,
  datePlaced: {
    type: Date,
    default: new Date()
  },
  items: [
  ],
  payments: [],
  shipments: []
};
module.exports = {
  properties: order,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'custId'
    }
  }
};