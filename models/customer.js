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
  },
  dateAquired: {
    type: Date,
    default: new Date()
  }
};

module.exports = {
  properties: customer,
  dataSource: 'db',
  public: true,
  relations: {
    order: {
      type: 'hasMany',
      model: 'order'
    },
    subscription: {
      type: 'hasMany',
      model: 'subscription'
    },
    currentSubscription: {
      type: 'belongsTo',
      model: 'subscription',
      foreignKey: 'currentSubscriptionId'
    },
    filament: {
      type: 'hasMany',
      model: 'filament'
    },
    filamentChange: {
      type: 'hasMany',
      model: 'filamentChange'
    },
    machineSwap: {
      type: 'hasMany',
      model: 'swap'
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
    scannersOwned: {
      type: 'hasMany',
      model: 'scanner'
    },
    cartridge: {
      type: 'hasMany',
      model: 'cartridge'
    },
    cartridgesReturned: {
      type: 'hasMany',
      model: 'cartridgeReturn'
    },
    swaps: {
      type: 'hasMany',
      model: 'swap'
    }
  }
};
