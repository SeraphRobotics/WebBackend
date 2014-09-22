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
        // Splits into two arrays
        vM.mParts = _.remove(parts, 'forMachine');
        // Add remaining to scope
        vM.cParts = parts;
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

  function mapNumberOfParts() {
    // body...
  }
}

