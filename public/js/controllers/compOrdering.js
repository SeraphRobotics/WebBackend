'use strict';
angular.module('compOrdering', [
  'lbServices',
  'helpers',
  'ngTable'
])
  .controller('compOrdering', function
  (
    $q,
    $log,
    $scope,
    $modal,
    $window,
    $timeout,
    $filter,
    Part,
    alertModal,
    VendorOrder,
    ngTableParams
  )
  {


    (function initData () {
      $scope.vendors = [];
      $scope.vendorOrder = {
        vendor: '',
        dateCreated: $filter('date')(new Date(), 'yyyy-MM-dd'),
        partsOrdered: [ { notAPart: true }]
      };

      Part.query()
        .$promise
        .then(function (parts) {
          $log.debug('Parts', parts);
          $scope.parts = parts;
          parts.forEach(function (part) {
            $scope.vendors.push(part.vendor);
          });
          $scope.vendors = _.uniq($scope.vendors);
          $scope.vendorOrder.vendor = $scope.vendors[0];
          $log.debug('Vendors', $scope.vendors);
        })
        .catch(function (err) {
          if (err.data) {
            $scope.genErr = err.data.error.message;
          } else {
            $scope.genErr = err;
          }
        })
      ;
    })();

    $scope.placeOrder = function (vendorOrder) {
      if (!vendorOrder.id || vendorOrder.id.length < 6) {
        $scope.orderIdErr = 'Order ID must be larger than 6 charactors';
        clearErrTimer('orderIdErr');
      } else if (!arePartsValid()) {
        $scope.partErr = true;
        clearErrTimer('partErr');
      } else {
        VendorOrder.create({}, $scope.vendorOrder).$promise
          .then(function (order) {
            $log.debug('Order', order);
            return alertModal('Order Placed');
          })
          .then(function () {
            $window.location.href = '/';
          })
          .catch(function (err) {
            if (err.data) {
              $scope.placeOrderErr = err.data.error.message;
            } else {
              $scope.placeOrderErr = err;
            }
          })
        ;
      }
    };

    $scope.tableParams = new ngTableParams({}, { // jshint ignore: line
      counts:[]
    });

    $scope.addItem = function addItem () {
      $scope.vendorOrder.partsOrdered.push({ notAPart: true });
    };

    $scope.removePart = function removePart ($index) {
      $log.debug('Remove', $index);
      $scope.vendorOrder.partsOrdered.splice($index, 1);
    };

    $scope.findPartById = function (id, $index) {
      if (!id || !_.isString(id)) { return; }
      $log.debug('id', id);
      _.chain($scope.parts)
        .filter(function (part) {
          return part.vendor.toLowerCase() === $scope.vendorOrder.vendor.toLowerCase();
        })
        .filter(function (part) {
          return part.id === id;
        })
        .first(1)
        .forEach(function (part) {
          $log.debug('Part', part);
          mapToOrderedParts(part, $index);
        })
      ;
    };

    $scope.findPartByName = function (name, $index) {
      if (!name || !_.isString(name)) { return; }
      $log.debug('name', name);
      var vendor = $scope.vendorOrder.vendor.toLowerCase();
      _.chain($scope.parts)
        .filter(function (part) {
          return part.vendor.toLowerString() === vendor;
        })
        .filter(function (part) {
          return part.name.toLowerCase() === name.toLowerCase();
        })
        .first(1)
        .forEach(function (part) {
          $log.debug('Part', part);
          mapToOrderedParts(part, $index);
        })
      ;
    };

    $scope.filterParts = function(vendor) {
      vendor = vendor.toLowerCase();
      $scope.vendorOrder.partsOrdered = _.chain($scope.vendorOrder.partsOrdered)
        .filter(function (part) {
          part.vendor = part.vendor || '';
          return part.vendor.toLowerCase() === vendor;
        })
        .value()
      ;
    };

    function mapToOrderedParts (part, $index) {
      $scope.vendorOrder.partsOrdered[$index] = {
        id: part.id,
        name: part.name,
        numPerBatch: part.numPerBatch || 0,
        numOfBatches: 0,
        vendor: part.vendor,
        $edit: part.$edit
      };

      var unique = _.uniq($scope.vendorOrder.partsOrdered, 'name');
      if (unique.length !== $scope.vendorOrder.partsOrdered.length) {
        $scope.vendorOrder.partsOrdered = unique;
        alertModal('Part already in order');
      }
    }

    function clearErrTimer (scopeVar) {
      $timeout(function () {
        $scope[scopeVar] = null;
      }, 1700);
    }

    function arePartsValid () {
      var notParts = _.chain($scope.vendorOrder.partsOrdered)
        .filter(function (part) {
          return part.notAPart;
        })
        .value()
      ;

      if (notParts.length > 0) {
        return false;
      } else {
        return true;
      }
    }

  })
;
