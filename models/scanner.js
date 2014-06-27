"use strict";
var Scanner = {
  custId: Number,
  machineNum: Number,
  IOTimes: [
    {
      type: String,
      time: Number
    }
  ],
  scanTimes: [
    Number
  ]
};

module.exports = {
  properties: Scanner,
  dataSource: 'db',
  public: true,
  relations: {}
};