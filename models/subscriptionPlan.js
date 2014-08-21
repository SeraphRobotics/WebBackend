'use strict';
var subscriptionPlan = {//This is an open model
  name: {
    required: true,
    type: String,
    index: {
      unique: true
    }
  },
  schema: {
    type: String,
    default: ''
  }
};

module.exports = {
  properties: subscriptionPlan,
  dataSource: 'db',
  strict: false,
  public: true,
  relations: {
    customers: {
      type: 'hasMany',
      model: 'customer',
      through: 'subscription'
    },
    subscriptions: {
      type: 'hasMany',
      model: 'subscription'
    }
  }
};
