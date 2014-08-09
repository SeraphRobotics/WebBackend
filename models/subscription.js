'use strict';
var subscriptions = {
  dateStart: {
    type: Date,
    default: new Date()
  },
  dateEnd: {
    type: Date
  }
};

module.exports = {
  properties: subscriptions,
  dataSource: 'db',
  public: true,
  relations: {
    customer: {
      type: 'belongsTo',
      model: 'customer'
    },
    subscriptionPlan: {
      type: 'belongsTo',
      model: 'subscriptionPlan'
    }
  }
};
