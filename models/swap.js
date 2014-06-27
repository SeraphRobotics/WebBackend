"use strict";
var swap = {
  custId: Number,
  date: {
    type: Date,
    default: new Date()
  },
  oldMachineNum: {
    type: Number,
    required: true
  },
  newMachineNum: {
    type: Number,
    required: true
  },
  shipmentNum: {
    type: Number,
    required: true
  }
};

module.exports = {
  properties: swap,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'custId'
    },
    shipment: {
      type: 'belongsTo',
      model: 'shipment',
      foreignKey: 'shipmentNum'
    },
    oldMachine: {
      type: 'belongsTo',
      model: 'machine',
      foreignKey: 'machineNum'
    },
    newMachine: {
      type: 'belongsTo',
      model: 'machine',
      foreignKey: 'machineNum'
    }
  }
};