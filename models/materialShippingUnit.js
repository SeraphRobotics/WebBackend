'use strict';
var materialShippingUnit = {
  name: {
    type: String,
    required: true,
    unique: true
  },
  planId: {
    type: String,
    unique: true
  },
  cartridgesPerCarton: {
    type: Number,
    default: 0
  },
  cartons: {
    type: Number,
    default: 0
  },
  reelsOfFilament: {
    type: Number,
    default: 0
  },
  kgOfMaterialPerReel: {
    type: Number,
    default: 0
  }
};

module.exports = {
  properties: materialShippingUnit,
  strict: true,
  dataSource: 'db',
  public: true,
  relations: {
  }
};
