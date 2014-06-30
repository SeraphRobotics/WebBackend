'use strict';
var machine = {
  machineNum: {
    type: Number,
    id: true
  },
  machineType: {
    type: String,
    required: true
  },
  dateManufactured: {
    type: Date,
    default: new Date()
  },
  logs: {
    type: [],
    default: []
  }
};

module.exports = {
  properties: machine,
  dataSource: 'db',
  public: true,
  relations: {}
};
