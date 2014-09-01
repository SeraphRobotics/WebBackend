'use strict';
angular
  .module('app')
  .controller('compReceiving', compReceiving)
;

compReceiving.$inject = [
  '$q',
  '$scope',
  '$modal',
  'Part',
  'VendorOrder'
];

function compReceiving
(
  $q,
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
        $scope.orders = orders;
      })
    ;
    Part.query().$promise
      .then(function (parts) {
        $scope.parts = parts;

        parts.forEach(function (part) {
          $scope.vendors.push(part.vendor);
        });
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
