'use strict';
var customer = {
  custId: {
    type: String,
    id: true
  },
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
  phoneNum: [
    Number
  ],
  faxNum: [
    Number
  ],
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
      foreignKey: 'custId'
    },
    subscription: {
      type: 'hasMany',
      model: 'subscription',
      foreignKey: 'subscriptionId'
    },
    filamentChange: {
      type: 'hasMany',
      model: 'filamentChange',
      foreignKey: 'filamentId'
    },
    machineSwap: {
      type: 'hasMany',
      model: 'swap'
    },
    machinesOwned: {
      type: 'hasMany',
      model: 'machine',
      foreignKey: 'machinesOwned'
    },
    machinesReturned: {
      type: 'hasMany',
      model: 'machine',
      foreignKey: 'machinesReturned'
    },
    cartridgeReturn: {
      type: 'hasMany',
      model: 'cartridgeReturn'
    }
  }
};
