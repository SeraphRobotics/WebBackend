"use strict";
var machine = {
  machineNum: {
    type: Number,
    id: true
  },
  machineType: String,
  dateManufactured: {
    type: Date,
    default: new Date()
  },
  logs: [
    String
  ]
};

module.exports = {
  properties: machine,
  dataSource: 'db',
  public: true,
  relations: {}
};