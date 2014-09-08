'use strict';
var Scanner = {
  IOTimes: {
    type: [
    {
      type: {
        type: Boolean,
        default: false
      },
      time: {
        type: Number,
        default: 0
      }
    }
    ],
    default: []
  },
  scanTimes: {
    type: [ Number ],
    default: []
  }
};

module.exports = {
  properties: Scanner,
  dataSource: 'db',
  public: true,
  relations: {
    machine: {
      type: 'belongsTo',
      model: 'machine'
    },
    returnedBy: {
      type: 'hasAndBelongsToMany',
      model: 'customer'
    }
  }
};
