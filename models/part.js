"use strict";
var Part= {
  name: {
    type: String,
    required: true
  },
  partNum: {
    type: String,
    required: true,
    unique: true
  },
  vendor: String,
  numInStock: Number,
  machineUsage: [
    {
      mType: String,
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
  relations: {}
};