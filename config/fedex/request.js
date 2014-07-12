function timeStamp () {
  'use strict';
  var d = new Date();
  var year = d.getFullYear();
  var day = (d.getDate() + 5)%31;
  var month = d.getMonth() + 1;
  var hour = 17;
  var min = '00';
  var UTC= '04:00';
  return year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':00-' + UTC;
}
module.exports = {
  ShipTimestamp: {
    type: String,
    default: timeStamp()
  },
  ServiceType: {
    type: String,
    required: true
  },
  PackagingType: {
    type: String,
    required: true
  },
  Shipper: {
    type: String,
    required: true
  },
  Recipient: {
    type: String,
    required: true
  },
  ShippingChargesPayment: {
    type: String,
    required: true
  },
  LabelSpecification: {
    type: String,
    required: true
  },
  clientDetail: {
    AccountNumber: {
      type: Number,
      default: 510087585
    },
    MeterNumber: {
      type: Number,
      default: 118639612
    }
  }
};
