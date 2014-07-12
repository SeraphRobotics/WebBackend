'use strict';
var Part= {
  partNum: {
    type: String,
    id: true
  },
  name: {
    type: String,
    required: true
  },
  vendor: String,
  numInStock: Number,
  machineUsage: [
    {
      machineType: String,
      quantity: Number
    }
  ],
  forMachine: {
    type: Boolean,
    default: true
  },
  costPer: Number,
  batchSize: Number,
  expectedLeadTime: Number
};
module.exports = {
  properties: Part,
  dataSource: 'db',
  public: true,
  relations: {
    vendorOrder: {
      type: 'hasAndBelongsToMany',
      model: 'vendorOrder',
      foreignKey: 'orderNum'
    }
  }
};
