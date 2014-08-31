'use strict';
var VendorOrder = {
  vendor: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date()
  },
  partsOrdered:{
    type: [
      {
        partNum: Number,
        quantity: Number
      }
    ],
    default: []
  },
  partsReceived: {
    type: [
      {
        partNum: Number,
        dateReceived: Date
      }
    ],
    default: []
  }
};
module.exports = {
  properties: VendorOrder,
  dataSource: 'db',
  public: true,
  relations: {
    vendor: {
      type: 'belongsTo',
      model: 'vendor'
    },
    part: {
      type: 'hasAndBelongsToMany',
      model: 'part'
    }
  }
};
