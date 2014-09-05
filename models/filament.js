'use strict';
var filament = {
  volume: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: ''
  },
  vendor: {
    type: String,
    default: ''
  },
  material: {
    type: String,
    default: ''
  },
  numbPerBatch: {
    type: Number,
    default: 1
  },
  importDate: {
    type: Date,
    default: new Date()
  },
  leadTime: {
    type: Number,
    leadTime: 1
  },
  isSold: {
    type: Boolean,
    default: false
  }
};

module.exports = {
  properties: filament,
  dataSource: 'db',
  strict: true,
  public: true,
  relations: {
    filamentChanges: {
      type: 'hasMany',
      model: 'filamentChange'
    },
    customer: {
      type: 'belongsTo',
      model: 'customer'
    }
  }
};
