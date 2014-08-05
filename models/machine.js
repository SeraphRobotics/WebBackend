'use strict';
var machine = {
  machineType: {
    type: String,
    required: true
  },
  dateManufactured: {
    type: Date,
    default: new Date()
  },
  machineStatus: {
    type: String,
    default: 'Operational in warehouse'
  },
  logs: [
    {
      date: {
        default: new Date(),
        type: Date,
      },
      status: String,
      custId: String,
      custName: String,
      comments: String
    }
  ]
};

module.exports = {
  properties: machine,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'hasAndBelongsToMany',
      model: 'customer'
    }
  }
};
