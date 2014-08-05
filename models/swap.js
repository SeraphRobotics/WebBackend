'use strict';
var swap = {
  date: {
    type: Date,
    default: new Date()
  },
  oldMachineNum: {
    type: String,
    required: true
  },
  newMachineNum: {
    type: String
  },
  shipmentNum: {
    type: String,
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
    },
    shipment: {
      type: 'belongsTo',
      model: 'shipment',
      foreignKey: 'shipmentNum'
    },
    oldMachine: {
      type: 'belongsTo',
      model: 'machine',
      foreignKey: 'oldMachineNum'
    },
    newMachine: {
      type: 'belongsTo',
      model: 'machine',
      foreignKey: 'newMachineNum'
    }
  }
};
