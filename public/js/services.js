"use strict";
angular.module('services', ['ngResource'])
  .factory('Parts', function ($resource) {
    return $resource('api/parts');
  })
  .factory('VendorOrders', function ($resource) {
    return $resource('api/vendorOrders');
  })
;
