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
      type: 'hasMany',
      model: 'customer',
      foreignkey: 'cutomerId'
    }
  }
};
