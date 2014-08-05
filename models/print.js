'use strict';
var print = {
  custId: Number,
  machineNum: Number,
  cartridgeVol: Number,
  filamentVol: Number,
  timeToPrint: Number,
  date: {
    type: Date,
    default: new Date()
  }
};

module.exports = {
  properties: print,
  dataSource: 'db',
  public: true,
  relations: {}
};
