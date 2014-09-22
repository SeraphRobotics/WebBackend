'use strict';
var Scanner = {
  IOTimes: {
    type: [
    {
      type: {
        type: Boolean, // On/Off
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
    type: [Number],
    default: []  //Number of scans per scanner
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
    customersOwned: {
      type: 'belongsTo',
      model: 'customer'
    }
  }
};
