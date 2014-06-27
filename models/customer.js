"use strict";
var customer = {
  custId: {
    type: 'string',
    index: {
      unique: true
    },
    id: true
  },
  address: {
    street: 'string',
    city: 'string',
    state: 'string',
    zip: Number
  },
  email: [
    'string'
  ],
  phoneNum: [
    Number
  ],
  faxNum: [
    Number
  ]
};

module.exports = {
  properties: customer,
  dataSource: 'db',
  public: true,
  relations: {
    orders: {
      type: "hasMany",
      model: "order",
      foreignKey: 'custId'
    }
  }
};