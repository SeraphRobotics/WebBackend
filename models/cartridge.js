"use strict";
var cartridge = {
  cartridgeNum: {
    type: Number,
    id: true
  },
  numOfCarts: Number,
  manufactureDate: {
    type: Date,
    default: new Date()
  }
};

module.exports = {
  properties: cartridge,
  dataSource: 'db',
  public: true,
  relations: {}
};
