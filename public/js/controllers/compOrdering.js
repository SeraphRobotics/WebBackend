'use strict';
angular.module('compOrdering', [
  'lbServices',
  'helpers'
])
  .controller('compOrdering', function ($scope, $log, $filter, Vendor, VendorOrder, Part) {

    $scope.vendorOrder = {};

    Vendor.query().$promise
      .then(function (vendors) {
        $log.debug(vendors);
        $scope.vendors = vendors;
      })
      .catch(function (err) {
        if (err.data) {
          $scope.genErr = err.data.error.message;
        } else {
          $scope.genErr = err;
        }
      })
    ;

    $scope.vendorOrder.dateCreated = $filter('date')(new Date(), 'yyyy-MM-dd');
    $scope.placeOrder = function (selectedVendor) {
      $scope.vendorOrder.vendor = selectedVendor.name;
      VendorOrder.create($scope.vendorOrder).$promise
        .then(function (instantceOf) {
          $log.debug(instantceOf);
          //setTimeout(function () {window.location.href = '/';}, 500);
        })
        .catch($log.error)
      ;
    };
    $scope.addItem = function () {
      $scope.parts.push({});
    };
    $scope.parts = Part.query()//returns array of parts
        .$promise
        .then(function (res) {
          $log.debug('success');
          $log.debug(res);
        })
        .catch(function (err) {
          $log.debug(err);
        })
    ;
  })
;
