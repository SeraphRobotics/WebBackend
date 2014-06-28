"use strict";
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
  costPer: Number,
  batchSize: Number,
  expectedLeadTime: Number
};
module.exports = {
  properties: Part,
  dataSource: 'db',
  public: true,
  relations: {
    part: {
      type: 'hasMany',
      model: 'part',
      foreignKey: 'partNum'
    }
  }
};