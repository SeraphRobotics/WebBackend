'use strict';
var filament = {
  volume: {
    type: Number,
    default: 0
  },
  type: String,
  importDate: {
    type: Date,
    default: new Date()
  }
};

module.exports = {
  properties: filament,
  dataSource: 'db',
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
