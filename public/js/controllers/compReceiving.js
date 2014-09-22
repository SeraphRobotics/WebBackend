'use strict';
angular
  .module('app')
  .controller('compReceiving', compReceiving);

compReceiving.$inject = [
  '$q',
  '$log',
  '$scope',
  '$modal',
  '$timeout',
  'Part',
  'alertModal',
  'VendorOrder'
];

function compReceiving(
  $q,
  $log,
  $scope,
  $modal,
  $timeout,
  Part,
  alertModal,
  VendorOrder
)
{
  initController();

  $scope.editOrder = editOrder;

  function initController() {
    $scope.vendors = [];
    VendorOrder.query().$promise
      .then(function(orders) {
        $log.debug('Orders', orders);
        $scope.orders = orders;
      })
      .catch(function(err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      });

    Part.query().$promise
      .then(function(parts) {
        $log.debug('Parts', parts);
        parts.forEach(function(part) {
          $scope.vendors.push(part.vendor);
        });

        $scope.parts = parts;
        $scope.vendors = _.uniq($scope.vendors);
      })
      .catch(function(err) {
        if (err.data) {
          alertModal(err.data.error.message);
        } else {
          alertModal(err);
        }
      });
  }

  function editOrder(order) {
    $modal.open({ //Returns modal instance
      templateUrl: 'editOrderModal.html',
      controller: modalController,
      resolve: {
        order: function() {
          return order;
        },
        parts: function() { return $scope.parts; }
      }
    });
  }

  modalController.$inject = [
    '$log',
    '$scope',
    '$modalInstance',
    'order',
    'parts',
    'VendorOrder'
  ];

  function modalController($log, $scope, $modalInstance, order, partsInDb) {
    $scope.date = order.dateCreated;

    $log.debug('Order', order);
    $scope.parts = _.map(order.partsOrdered, function(part) {
      part.prevBatchesReceived = part.batchesReceived;
      return part;
    });

    $log.debug('Parts', $scope.parts);

    $scope.saveChanges = function() {
      order.partsOrdered = _.map($scope.parts, function(part) {
        return _.omit(part, 'prevBatchesReceived');
      });

      order.$save()
        .then(function() {
          var promises = [];
          $log.debug('save');

          $scope.parts
            .forEach(function(part) {
              var numberToAdd = part.batchesReceived - part.prevBatchesReceived;
              if (numberToAdd > 0) {
                partsInDb.forEach(function(partToMatch) {
                  if (partToMatch.id === part.id) {
                    partToMatch.numInStock += numberToAdd;
                    promises.push(partToMatch.$save());
                  } else {
                    return;
                  }
                });
              }
            });
          return $q.all(promises);
        })
        .then(function() {
          $modalInstance.dismiss();
        })
        .catch(function(err) {
          if (err.data) {
            $scope.saveErr = err.data.error.message;
          } else {
            $scope.saveErr = err;
          }
          clearErrTimer('saveErr');
        });
    };

    $scope.cancel = function() {
      $modalInstance.close();
    };
  }

  function clearErrTimer(prop) {
    $timeout(function() {
      $scope[prop] = null;
    }, 1700);
  }
}
