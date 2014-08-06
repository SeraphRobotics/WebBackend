'use strict';
var cartridgeCredit = {
  date: {
    type: Date,
    default: new Date()
  },
  batchId: {
    type: Number
  },
  numOfCartridges: {
    type: Number
  }
};

module.exports = {
  properties: cartridgeCredit,
  dataSource: 'db',
  public: true,
  relations: {
    cartridge: {
      model: 'cartridge',
      type: 'belongsTo'
    },
    customer: {
      model: 'customer',
      type: 'belongsTo'
    }
  }
};
