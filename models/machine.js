'use strict';
var machine = {
  machineType: {
    type: String,
    required: true
  },
  dateManufactured: {
    type: Date,
    default: new Date()
  },
  machineStatus: {
    type: String,
    default: 'Operational in warehouse'
  },
  numOfServices: {
    type: Number,
    default: 0
  },
  logs: {
    type: [
    {
        date: {
          default: new Date(),
          type: Date
        },
        status: String,
        custId: String,
        custName: String,
        comments: String
      }
    ],
    default: []
  }
};

module.exports = {
  properties: machine,
  dataSource: 'db',
  public: true,
  strict: true,
  relations: {
    returnedBy: {
      type: 'hasAndBelongsToMany',
      model: 'customer'
    },
    scanner: {
      type: 'belongsTo',
      model: 'scanner'
    },
    currentCustomer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'ownedBy' //Key is attached to this model
    },
    prevCustomer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'prevOwner' //Key is attached to this model
    }
  }
};
