'use strict';
var cartridge = {
  numOfCarts: Number,
  manufactureDate: {
    type: Date,
    default: new Date()
  },
  soldOnDate: {
    type: Date
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
    }
  }
};
