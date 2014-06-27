"use strict";
var filamentChange = {
  custId: Number,
  machineNum: Number,
  time: Number,
  filamentId: {
    type: Number,
    required: true
  },
  volumeUsed: Number
};

module.exports = {
  properties: filamentChange,
  dataSource: 'db',
  public: true,
  relations: {
    filament: {
      type: 'belongsTo',
      model: 'filament',
      foreignKeys: 'filamentNum'
    }
  }
};