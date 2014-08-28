'use strict';
var filamentChange = {
  time: Number,
  volumeUsed: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: new Date()
  }
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
