"use strict";
var filament = {
  filamentNum: {
    type: Number,
    id: true
  },
  vol: Number,
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
      model: 'filamentChange',
      type: 'hasMany'
    }
  }
};