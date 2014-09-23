'use strict';
angular.module('app')
  .controller('findItemModal', FindItemModal)
  .controller('OrderFulfill', OrderFulfill);

OrderFulfill.$injector = [
  '$q',
  '$log',
  '$scope',
  '$modal',
  'Order',
  'Machine',
  'Filament',
  'Cartridge',
  'Shipment'
];

function OrderFulfill(
  $q,
  $log,
  $scope,
  $modal,
  Order,
  Machine,
  Filament,
  Cartridge,
  Shipment
)
{
  $scope.newShipment = { items: [] };

  $scope.initId = function(id) {
    if (id === 'undefined') { return; }
    $log.debug('Id', id);
    $scope.orderId = id;
    $scope.findOrder(id);
  };

  $scope.findOrder = function(id) {
    id = { id: id };
    Order.findById(id)
      .$promise
      .then(function(order) {
        $log.debug('Order', order);
        $scope.order = order;
        return Order.customer(id).$promise;
      })
      .then(function(customer) {
        $log.debug('Customer', customer);
        $scope.customer = customer;
        return Order.shipments(id).$promise;
      })
      .then(function(shipments) {
        $log.debug('Shipments', shipments);
        $scope.shipments = shipments;
      })
      .catch(function(err) {
        $log.debug(err);
        if (err.data) {
          $scope.findOrderErr = err.data.error.message;
        }
      });
  };

  $scope.clearOrderErr = function() {
    $scope.findOrderErr = null;
  };

  $scope.openFindItemModal = function(item) {

    var modalInstance = $modal.open({
      templateUrl: 'findItemModal.html',
      controller: 'findItemModal',
      resolve: {
        type: function() {
          return item.type;
        }
      }
    });

    modalInstance
      .result
      .then(function(model) {
        $log.debug('Model', model);
        item.item = model;
        item.id = model.id;
        item.shipmentId = 'New';
      });
  };

  $scope.addToShipment = function(item) {
    $scope.newShipment.items = _.filter($scope.newShipment, item);
    $scope.newShipment.items.push(item);
  };

  $scope.createShipment = function() {
    var machinesToBeShipped = []; //Assigned to shipment
    var cartridgesToBeShipped = []; //Assigned to shipment
    var filamentsToBeShipped = []; //Assigned to shipment

    //TODO: A shipment needs to be created through fedex here
    Shipment.create({}, {
      trackingNum: 'test' + Math.floor(Math.random() * 100),
      items: _.map($scope.newShipment.items, function(item) {
        if (item.type === 'printer' || item.type === 'tablet' ||
            item.type === 'scanner') {
          machinesToBeShipped.push(item.id);
        } else if (item.type === 'cartridge') {
          cartridgesToBeShipped.push(item.id);
        } else if (item.type === 'filament') {
          filamentsToBeShipped.push(item.id);
        }

        return {
          id: item.id,
          status: 'to be shipped',
          type: item.type,
          item: item.item
        };
      }),
      orderId: $scope.order.id
    })
      .$promise
      /**
        * Once shipment is placed
        */
      .then(function(shipment) {
        $scope.shipments.push(shipment);
        var isComplete = true;

        $scope.order.items = _.map($scope.order.items, function(item) {
          var itemsToBeShipped =
            _.union(machinesToBeShipped,
                    filamentsToBeShipped,
                    cartridgesToBeShipped);
          _.forEach(itemsToBeShipped, function(id) {
            if (item.id === id) {
              item.status = 'to be shipped';
              item.shipmentId = shipment.id;
            }
          });
          return item;
        });

        _.forEach($scope.order.items, function(item) {
          if (item.status === 'unfulfilled') {
            isComplete = false;
          }
        });

        $scope.order.isComplete = isComplete;  //Mark order complete
        return $scope.order.$save();
      })
      .then(function(order) {
        $log.debug('Updated Order', order);
        var customerId = order.customerId;
        var machineUpdates = [];
        var cartridgeUpdates = [];
        var filamentUpdate = [];

        $scope.newShipment = { items: [] };

        // Mark machines as to be shipped
        _.forEach(machinesToBeShipped, function(id) {
          var promise = Machine.prototype$updateAttributes({ id: id },
            {
              machineStatus: 'Assigned to shipment',
              ownedById: customerId
            }
            ).$promise;
          machineUpdates.push(promise);
        });

        _.forEach(filamentsToBeShipped, function(id) {
          var promise = Filament.prototype$updateAttributes({ id: id },
            {
              isSold: true,
              customerId: customerId
            }
          ).$promise;
          filamentUpdate.push(promise);
        });

        _.forEach(cartridgesToBeShipped, function(id) {
          var promise = Cartridge.prototype$updateAttributes({ id: id },
            {
              isSold: true,
              customerId: customerId
            }
          ).$promise;
          cartridgeUpdates.push(promise);
        });

        return $q.all(
          _.union(machineUpdates, cartridgeUpdates, filamentUpdate)
        );
      })
      .then(function(machines) {
        $log.debug('All machines updated', machines);
      })
      .catch(function(err) {
        $log.debug(err);
        if (err.data) {
          $scope.createShipmentErr = err.data.error.message;
        } else {
          $scope.createShipmentErr = err;
        }
      });
  };
}

FindItemModal.$injector = [
  '$q',
  '$log',
  '$scope',
  '$modalInstance',
  'type',
  'Machine',
  'Filament',
  'Cartridge'
];

function FindItemModal(
  $q,
  $log,
  $scope,
  $modalInstance,
  type,
  Machine,
  Filament,
  Cartridge
) {
  $scope.type = type;

  var findIt = {
    findMachine: function(id) {
      return Machine.findById(id).$promise;
    },
    printer: function(id) {
      return this.findMachine({ id: id });
    },
    tablet: function(id) {
      return this.findMachine({ id: id });
    },
    scanner: function(id) {
      return this.findMachine({ id: id });
    },
    filament: function(id) {
      return Filament.findById({ id: id }).$promise;
    },
    cartridge: function(id) {
      return Cartridge.findById({ id: id }).$promise;
    }
  };

  $scope.findItem = function(id) {
    var promise = findIt[type](id);
    promise
      .then(function(item) {
        $log.debug('Item', item);
        if (item.machineType) {
          if (item.machineType === type) {
            if (item.machineStatus === 'Operational in warehouse') {
              $modalInstance.close(item);
            } else {
              return $q.reject(
                  'Machine not ready to ship, its status is ' +
                    item.machineStatus
                );
            }
          } else {
            return $q.reject(
              'Machine type does not match. It is a ' + item.machineType
            );
          }
        } else {
          $modalInstance.close(item);
        }
      })
      .catch(function(err) {
        $log.debug(err);
        if (err.data) {
          $scope.findItemIdErr = err.data.error.message;
        } else {
          $scope.findItemIdErr = err;
        }
      });
  };

  $scope.clearItemIdErr = function() {
    $scope.findItemIdErr = null;
  };
}
