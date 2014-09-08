'use strict';
angular
  .module('app.paginateData', [
    'lbServices'
  ])
  .factory('machinePage', machinePage)
  .factory('filamentPage', filamentPage)
  .factory('cartridgePage', cartridgePage)
  .factory('inventoryPageInterface', inventoryPageInterface)
  .factory('inventoryCount', inventoryCount)
;

machinePage.$inject = [ '$q', 'Machine' ];

function machinePage ($q, Machine) {
  var types = ['printer', 'scanner', 'tablet'];

  return function machinePage (limit, skip, status, thenable) {

    var promises = {};
    types.forEach(function (type) {
      promises[type] = Machine.query({
        filter: {
          where: {
            machineType: type,
            machineStatus: status
          },
          limit: limit,
          skip: skip
        }
      })
      .$promise;
    });

    return thenable? promises: $q.all(promises);
  };
}

filamentPage.$inject = [ 'Filament' ];

function filamentPage (Filament) {

  return function filamentPage(limit, skip, isSold) {
    isSold = isSold || false;
    var filter = { limit: limit, skip: skip };
    if (isSold) { filter.where = isSold; }
    return Filament.query({ filter: filter }).$promise;
  };
}

cartridgePage.$inject = [ 'Cartridge' ];

function cartridgePage (Cartridge) {

  return function cartridgePage (limit, skip, isSold) {
    isSold = isSold || false;
    var filter = { limit: limit, skip: skip };
    if (isSold) { filter.where = isSold; }
    return Cartridge.query({ filter: filter }).$promise;
  };
}

inventoryPageInterface.$inject = [ '$q', 'cartridgePage', 'filamentPage', 'machinePage' ];

function inventoryPageInterface ($q, cartridgePage, filamentPage, machinePage) {
  var queries = {};
  return function inventoryPageInterface (limit, skip, status, isSold ) {
    queries.cartridge = cartridgePage(limit, skip, isSold);
    queries.filament = filamentPage(limit, skip, isSold);
    var machineQuery = machinePage(limit, skip, status, true);
    return $q.all(_.extend(queries, machineQuery));
  };
}

inventoryCount.$inject = [ '$q', 'Machine', 'Filament', 'Cartridge' ];

function inventoryCount ($q, Machine, Filament, Cartridge) {
  var types = ['printer', 'scanner', 'tablet'];

  return function machineCounts (machineStatus, filamentStatus, cartridgeStatus) {
    cartridgeStatus = cartridgeStatus || filamentStatus || false;
    filamentStatus = filamentStatus || false;
    var promises = {};

    types.forEach(function (type) {

      promises[type] = Machine.count({
        where: {
          machineType: type,
          machineStatus: machineStatus
        }
      }).$promise;

    });

    if (filamentStatus) {
      promises.filament = Filament.count({
        where: filamentStatus
      }).$promise;
    } else {
      promises.filament = { count: 0 };
    }

    if (cartridgeStatus) {
      promises.cartridge = Cartridge.count({
        where: cartridgeStatus
      }).$promise;
    } else {
      promises.cartridge = { count: 0 };
    }

    return $q.all(promises);
  };
}
