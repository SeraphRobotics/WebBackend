'use strict';
var Part = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  vendor: {
    type: String,
    required: true
  },
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
  costPer: {
    type: Number,
    default: 0
  },
  numPerBatch: {
    type: Number,
    default: 1
  },
  numInStock: {
    type: Number,
    default: 0
  },
  expectedLeadTime: {
    type: Number,
    default: 1
  }
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
