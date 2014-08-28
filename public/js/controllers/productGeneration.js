/* global angular */
'use strict';
angular.module('productGeneration', [
  'lbServices'
])
  .controller('productGeneration', function ($q, $scope, $log, Machine, Filament, Scanner, Cartridge) {
    $scope.hasSerialNumber = false;
    $scope.newProducts = [];

    function createMachine(id) {
      $log.debug('creating machine');
      var data = {
        machineType: $scope.type
      };
      $q.when(true)
        .then(function () {
          if ($scope.type === 'Scanner') {
            return Scanner.create({}).$promise;
          } else {
            return false;
          }
        })
        .then(function (scanner) {
          if (scanner) {
            data.scannerId = scanner.id;
            $scope.scanner = scanner;
          }
          if ($scope.type === 'Tablet') {
            if (!id) {
              return $q.reject('tablet and no id');
            } else {
              data.id = id;
            }
          }
          return Machine.create({}, data).$promise;
        })
        .then(function (machineInstance) {
          $scope.newProducts.push(machineInstance);
          $scope.serialNumber = machineInstance.id;
          $log.debug(machineInstance);
          if (machineInstance.scannerId && $scope.scanner) {
            $scope.scanner.machineId = machineInstance.id;
            return $scope.scanner.$save();
          }
        })
        .then(function () {
          $log.debug('Success');
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
        Cartridge.create().$promise
          .then(function (cartrideInstance) {
            $log.debug(cartrideInstance);
            $scope.newProducts.push(cartrideInstance);
            $scope.serialNumber = cartrideInstance.id;
          })
          .catch($log.debug)
        ;
      },
      Filament: function () {
        Filament.create()
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
