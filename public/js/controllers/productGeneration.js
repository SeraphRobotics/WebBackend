/* global angular */
'use strict';
angular.module('productGeneration', [
  'lbServices'
])
  .controller('productGeneration', function ($scope, $log, Machine, Filament, Cartridge) {
    $scope.hasSerialNumber = false;
    $scope.newProducts = [];

    function createMachine(id) {
      $log.debug('creating machine');
      var data = {
        machineType: $scope.type
      };
      if ($scope.type === 'Tablet') {
          if (!id) {
            $log.error('tablet and no id');
            return 1;
          } else {
            data.id = id;
          }
      }
      Machine.create({}, data).$promise
        .then(function (machineInstance) {
          $scope.newProducts.push(machineInstance);
          $scope.serialNumber = machineInstance.id;
          $log.debug(machineInstance);
        })
        .catch(function (err) {
          $log.error(err);
        })
      ;
    }

    var createProduct = {
      Printer: function () { createMachine(); },
      Scanner: function () { createMachine(); },
      Tablet: function () {
        createMachine($scope.setSerialNumber);
      },
      Cartridge: function () {
        var data = {
          machineType: $scope.productType
        };
        Cartridge.create({}, data).$promise
          .then(function (cartrideInstance) {
            $log.debug(cartrideInstance);
            $scope.newProducts.push(cartrideInstance);
            $scope.serialNumber = cartrideInstance.id;
          })
          .catch($log.debug)
        ;
      },
      Filament: function () {
        var data = {
          machineType: $scope.productType
        };
        Filament.create({}, data)
          .$promise
          .then(function (filamentInstance) {
            $log.debug(filamentInstance);
            $scope.newProducts.push(filamentInstance);
            $scope.serialNumber = filamentInstance.id;
          })
          .catch(function (err) {
            $log.error(err);
          })
        ;
      }
    };

    $scope.clearSerial = function() {
      $scope.serialNumber =  '';
    };

    $scope.submit = function (type) {
      if (createProduct[type]) {
        createProduct[type]();
      }
    };
  })
;
