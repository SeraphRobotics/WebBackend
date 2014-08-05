'use strict';
var Vendor = {
  name: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
};

module.exports = {
  properties: Vendor,
  dataSource: 'db',
  public: true,
  relations: {
    vendorOrders: {
      type: 'hasMany',
      model: 'vendorOrder',
      foreignKey: 'orderNum'
    }
  }
};
