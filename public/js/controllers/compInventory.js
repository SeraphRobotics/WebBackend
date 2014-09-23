'use strict';
angular
  .module('app')
  .controller('CompInventory', CompInventory);

CompInventory.$inject = [
  '$log',
  'Part'
];

function CompInventory($log, Part) {
  var vM = this;
  initController();

  function initController() {
    Part.query({
      filter: {
        include: ['vendorOrder']
      }
    }).$promise
      .then(function(parts) {
        parts = mapNumberOfParts(parts);
        // Splits into two arrays
        vM.mParts = _.remove(parts, 'forMachine');
        // Add remaining to scope
        vM.cParts = mapNumberOfParts(parts);
        $log.debug('Parts', vM.mParts, parts);
      })
      .catch(function(err) {
        if (err.data) {
          vM.genErr = err.data.error.message;
        } else {
          vM.genErr = err;
        }
      });
  }

  function mapNumberOfParts(parts) {
    return _.chain(parts)
      .map(function(part) {
        part.printer = {
          ordered: 0
        };
        part.scanner = {
          ordered: 0
        };
        _.forEach(part.vendorOrder, function(order) {
          _.forEach(order.partsOrdered, function(partsOrd) {
            console.log(partsOrd);
            if (part.id === partsOrd.id) {
              if (part.numPerPrinter) {
                part.printer.ordered += partsOrd.numOfBatches;
              }
              if (part.numPerScanner) {
                part.scanner.ordered += partsOrd.numOfBatches;
              }
            }
          });
        });
        return part;
      })
      .value();
  }
}

