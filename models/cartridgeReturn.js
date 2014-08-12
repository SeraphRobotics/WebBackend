'use strict';
var cartridgeReturn = {
  date: {
    type: Date,
    default: new Date()
  }
};
module.exports = {
  properties: cartridgeReturn,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer'
    },
    cartridge: {
      type: 'belongsTo',
      model: 'cartridge'
    }
  }
};
