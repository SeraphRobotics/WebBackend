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
  payments: [],
  shipments: [],
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
