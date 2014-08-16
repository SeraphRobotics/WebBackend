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
  items: [],
  printers: {
    type: Number,
    default: 0
  },
  tablets: {
    type: Number,
    default: 0
  },
  scanners: {
    type: Number,
    default: 0
  },
  cartridges: {
    type: Number,
    default: 0
  },
  filaments: {
    type: Number,
    default: 0
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
    }
  }
};
