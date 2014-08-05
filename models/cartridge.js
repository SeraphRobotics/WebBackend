'use strict';
var cartridge = {
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
