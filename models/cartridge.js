'use strict';
var cartridge = {
  numOfCarts: Number,
  manufactureDate: {
    type: Date,
    default: new Date()
  },
  soldOnDate: {
    type: Date
  },
  isSold: {
    type: Boolean,
    default: false
  }
};

module.exports = {
  properties: cartridge,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer'
    },
    cartridgesReturned: {
      type: 'hasMany',
      model: 'cartridgeReturn'
    }
  }
};
