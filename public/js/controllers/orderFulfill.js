'use strict';
angular.module('orderFulfill', [
    'helpers',
    'lbServices',
    'mm.foundation.modal',
    'mm.foundation.accordion'
  ])
  .controller('orderFulfill', function
  (
    $q,
    $log,
    $scope,
    $modal,
    Order,
    Machine,
    Shipment
    //Filaments,
    //Cartridges
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
        .then(function (order) {
          $log.debug('Order', order);
          $scope.order = order;
          return Order.customer(id).$promise;
        })
        .then(function (customer) {
          $log.debug('Customer', customer);
          $scope.customer = customer;
          return Order.shipments(id).$promise;
        })
        .then(function (shipments) {
          $log.debug('Shipments', shipments);
          $scope.shipments = shipments;
        })
        .catch(function (err) {
          $log.debug(err);
          if (err.data) {
            $scope.findOrderErr = err.data.error.message;
          }
        })
      ;
    };

    $scope.clearOrderErr = function () {
      $scope.findOrderErr = null;
    };

    $scope.findMachine = function (id) {
      id = { id: id };
      $q
        .when(true)
        .then(function () {
          if (id.id && id.id.length > 6) {
            return Machine.findById(id).$promise;
          } else {
            return $q.reject('Id must be at least 6 charactors');
          }
        })
        .then(function (machine) {
          $log.debug('Machine', machine);
          $scope.machineId = '';
        })
        .catch(function (err) {
          if (err.data) {
            $scope.machineIdErr = err.data.error.message;
          } else {
            $scope.machineIdErr = err;
          }
        })
      ;
    };

    $scope.openFindItemModal = function(item) {

      var modalInstance = $modal.open({
        templateUrl: 'findItemModal.html',
        controller: 'findItemModal',
        resolve: {
          type: function () {
            return item.type;
          }
        }
      });

      modalInstance
        .result
        .then(function (model) {
          $log.debug('Model', model);
          item.item = model;
          item.id = model.id;
          item.shipmentId = 'New';
        })
      ;
    };

    $scope.addToShipment = function(item) {
      $scope.newShipment.items.push(item);
    };

    $scope.createShipment = function() {
      //A shipment needs to be created through fedex here
      Shipment.create({}, {
        trackingNum: 'test' + Math.floor(Math.random() * 100),
        items: _.chain($scope.newShipment.items)
          .map(function (item) {
            item.status = 'shipping';
            return item;
          })
          .value(),
        orderId: $scope.order.id
      })
        .$promise
        .then(function (shipment) {
          $scope.shipments.push(shipment);
          $scope.order.items = _.chain($scope.order.items)
            .filter(function (item) {
              return item.status === 'unfulfilled' && !!item.machine;
            })
            .map(function (item) {
              item.status = 'shipping';
              return item;
            })
            .value()
          ;
          return $scope.order.$save();
        })
        .then(function (order) {
          $log.debug('Updated Order', order);
          $log.debug(order === $scope.order);
        })
        .catch(function (err) {
          $log.debug(err);
          if (err.data) {
            $scope.createShipmentErr = err.data.error.message;
          } else {
            $scope.createShipmentErr = err;
          }
        })
      ;
    };

  })
  .controller('findItemModal', function ($log, $scope, $modalInstance, type, Machine, Filament, Cartridge) {
    $scope.type = type;

    var findIt = {
      findMachine: function (id) {
        return Machine.findById(id).$promise;
      },
      printer: function (id) {
        return this.findMachine({ id: id });
      },
      tablet: function (id) {
        return this.findMachine({ id: id });
      },
      scanner: function (id) {
        return this.findMachine({ id: id });
      },
      filament: function (id) {
        return Filament.findById({ id: id }).$promise;
      },
      cartridge: function (id) {
        return Cartridge.findById({ id: id }).$promise;
      }
    };

    $scope.findItem = function(id) {
      var promise = findIt[type](id);
      promise
        .then(function (item) {
          $modalInstance.close(item);
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.findItemIdErr = err.data.error.message;
        })
      ;
    };

    $scope.clearItemIdErr = function( ) {
      $scope.findItemIdErr = null;
    };
  })
;
