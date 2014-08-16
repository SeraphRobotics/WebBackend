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
  logs:{
    type: [
    {
        date: {
          default: new Date(),
          type: Date,
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
  relations: {
    returnedBy: {
      type: 'hasAndBelongsToMany',
      model: 'customer'
    },
    filamentChanges: {
      type: 'hasMany',
      model: 'filamentChange'
    },
    currentCustomer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'ownedBy' //Key is attached to this model
    }
  }
};
