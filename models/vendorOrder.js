'use strict';
var VendorOrder = {
  orderNum: {
    type: String,
    id: true
  },
  vendor: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  partsOrdered: [
    {
      partNum: Number,
      quantity: Number
    }
  ],
  partsReceived: [
    {
      partNum: Number,
      dateReceived: Date
    }
  ]
};
module.exports = {
  properties: VendorOrder,
  dataSource: 'db',
  public: true,
  relations: {
    vendor: {
      type: 'belongsTo',
      model: 'vendor',
      foreignKey: 'vendor'
    },
    part: {
      type: 'hasAndBelongsToMany',
      model: 'part',
      foreignKey: 'partNum'
    }
  }
};
