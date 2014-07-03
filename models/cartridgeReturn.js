'use strict';
var cartridgeReturn = {
  date: {
    type: Date,
    default: new Date()
  },
  cartridgeNum: {
    type: String,
    required: true,
    index: true
  }
};
module.exports = {
  properties: cartridgeReturn,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'custId'
    },
    cartridge: {
      type: 'belongsTo',
      model: 'cartridge',
      foreignKey: 'cartridgeNum'
    }
  }
};
