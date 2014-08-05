'use strict';
var subscriptionPlan = {//This is an open model
  name: {
    required: true,
    index: {
      unique: true
    }
  }
};

module.exports = {
  properties: subscriptionPlan,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'hasMany',
      model: 'customer',
      through: 'subscription'
    }
  }
};
