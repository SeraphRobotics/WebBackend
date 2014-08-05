'use strict';
var customer = {
  name: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  },
  primaryEmail: {
    type: String
  },
  phoneNum: {
    type: [String],
    default: []
  },
  faxNum: {
    type: [String],
    default: []
  },
  isMulti: {
    type: Boolean,
    default: false
  }
};

module.exports = {
  properties: customer,
  dataSource: 'db',
  public: true,
  relations: {
    order: {
      type: 'hasMany',
      model: 'order',
    },
    subscription: {
      type: 'hasMany',
      model: 'subscription',
    },
    filamentChange: {
      type: 'hasMany',
      model: 'filamentChange',
    },
    machineSwap: {
      type: 'hasMany',
      model: 'swap',
    },
    hasMachines: {
      type: 'hasMany',
      model: 'machine',
      foreignKey: 'ownedBy' //This key added to machine instance
    },
    machinesReturned: {
      type: 'hasAndBelongsToMany',
      model: 'machine'
    },
    cartridgesReturn: {
      type: 'hasAndBelongsToMany',
      model: 'cartridgeReturn'
    }
  }
};
