'use strict';
var order = {
  type: {
    type: String,
    required: true
  },
  datePlaced: {
    type: Date,
    default: new Date()
  },
  items: {
    type: [],
    default: []
  },
  payments: {
    type: [],
    default: []
  },
  cost: {
    type: Number,
    default: 0
  },
  shipments: {
    type: [],
    default: []
  },
  isComplete: {
    type: Boolean,
    default: false
  }
};
module.exports = {
  properties: order,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer'
    },
    shipments: {
      type: 'hasMany',
      model: 'shipment'
    }
  }
};
