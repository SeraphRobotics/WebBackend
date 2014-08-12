'use strict';
var filamentChange = {
  time: Number,
  volumeUsed: Number
};

module.exports = {
  properties: filamentChange,
  dataSource: 'db',
  public: true,
  relations: {
    filament: {
      type: 'belongsTo',
      model: 'filament'
    },
    customer: {
      type: 'belongsTo',
      model: 'customer'
    },
    machine: {
      type: 'belongsTo',
      model: 'machine'
    }
  }
};
