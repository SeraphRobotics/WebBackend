'use strict';
var subscriptions = {
  subscriptionId: {
    type: Number,
    id: true
  },
  dateStart: {
    type: Date,
    default: new Date()
  },
  dateEnd: {
    type: Date,
    default: new Date()
  },
  rate: Number,
  numOfCart: Number
};

module.exports = {
  properties: subscriptions,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer',
      foreignKey: 'custId'
    },
    plans: {
      type: 'hasMany',
      model: 'subscriptionPlan',
      foreignKey: 'planId'
    }
  }
};
