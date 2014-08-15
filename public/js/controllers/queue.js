/* globals _ */
'use strict';
angular.module('queue', [
  'lbServices'
])
  .controller('queue', function ($log, $scope, Order, Machine) {
    Order.query({ isComplete: false })
      .$promise
      .then(function (orders) {
        $log.debug(orders);
        $scope.orders = orders;
        return true;
      })
      .then(function () { // Count open orders

      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  })
;
