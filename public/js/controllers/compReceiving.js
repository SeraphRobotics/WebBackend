'use strict';
angular
  .module('app')
  .controller('compReceiving', compReceiving)
;

compReceiving.$inject = [
  '$q',
  '$log',
  '$scope',
  '$modal',
  'Part',
  'VendorOrder'
];

function compReceiving
(
  $q,
  $log,
  $scope,
  $modal,
  Part,
  VendorOrder
)
{
  initController();

  $scope.editOrder = editOrder;

  function initController () {
    $scope.vendors = [];
    VendorOrder.query().$promise
      .then(function (orders) {
        $log.debug('Orders', orders);
        $scope.orders = orders;
      })
    ;
    Part.query().$promise
      .then(function (parts) {
        $log.debug('Parts', parts);
        parts.forEach(function (part) {
          $scope.vendors.push(part.vendor);
        });

        $scope.parts = parts;
        $scope.vendors = _.uniq($scope.vendors);
      })
    ;
  }

  function editOrder (order) {
    $modal.open({ //Returns modal instance
      templateUrl: 'editOrderModal.html',
      controller: 'editOrderModalController',
      resolve: {
        order: function () {
          return order;
        }
      }
    });
  }
}
