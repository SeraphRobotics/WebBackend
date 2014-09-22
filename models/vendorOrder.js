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
  isComplete: {
    type: Boolean,
    default: false
  },
  partsOrdered: {
    type: [
      {
        id: String,
        vendor: {
          type: String,
          default: ''
        },
        numOfBatches: {
          type: Number,
          default: 0
        },
        numPerBatch: {
          type: Number,
          default: 0
        },
        batchesReceived: {
          type: Number,
          default: 0
        }
      }
    ],
    default: []
  }
  /* partsReceived: {
    type: [
      {
        id: String,
        vendor: {
          type: String,
          default: ''
        },
        numOfBatches: {
          type: Number,
          default: 0
        },
        numPerBatch: {
          type: Number,
          default: 0
        }
      }
    ],
    default: []
  } */
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
