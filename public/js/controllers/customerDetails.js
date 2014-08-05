/* globals angular */
'use strict';
angular.module('customerDetails', [
  'lbServices'
])
  .controller('customerDetails', function ($scope, $log, Customer, Order) {

    $scope.searchCust = function (custId) {
      if (custId && custId.length > 2) {
        $log.debug(custId);
        var id = {id: custId};
        Customer.findById(id).$promise.catch($log.debug)
          .then(function (customer) {
            $log.debug(customer);
            $scope.cust = customer;
          })
        ;
        Customer.subscription(id).$promise.catch($log.debug)
          .then(function (subscription) {
            $log.debug(subscription);
            $scope.subscription = subscription;
          })
        ;
        Customer.order(id).$promise.catch($log.debug)
          .then(function (orders) {
            $log.debug(orders);
            $scope.orders = orders;
          })
        ;
        Customer.filamentChange(id).$promise.catch($log.debug)
          .then(function (filamentChanges) {
            $log.debug(filamentChanges);
            $scope.filamentChange = filamentChanges;
          })
        ;
        Customer.machineSwap(id).$promise.catch($log.debug)
          .then(function (swaps) {
            $log.debug(swaps);
            $scope.swaps = swaps;
          })
        ;
     }
   };

   $scope.searchOrd = function (orderId) {
     $log.debug(orderId);
     if (orderId && orderId.length > 2) {
       $log.debug(orderId);
       Order.customer({orderId: orderId}).$promise.catch($log.error)
         .then(function (customer) {
           $log.debug(customer);
         })
       ;
     }
   };
  })
  .directive('updateCustomer', function ($log) {
    return {
      restrict: 'A',
      scope: {
        customer: '=cust'
      },
      link: function (scope, el) {
        el.bind('blur', function () {
          $log.debug(scope.customer);
          scope.customer.$save().catch($log.error)
            .then(function () {
              $log.debug('success');
            })
          ;
        });
      }
    };
  })
;
