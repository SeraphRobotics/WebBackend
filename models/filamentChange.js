"use strict";
var filamentChange = {
  custId: {
    type: String,
    required: true
  },
  machineNum: String,
  time: Number,
  filamentNum: {
    type: String,
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
    },
    customer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'custId'
    }
  }
};
