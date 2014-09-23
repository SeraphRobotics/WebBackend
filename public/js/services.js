'use strict';
angular.module('helpers', [
  'lbServices'
])
  .constant('machineTypes',
    [
      'Operational in warehouse',
      'Operational at customer',
      'Assigned to shipment',
      'In transit to warehouse',
      'In transit to Customer',
      'Broken in warehouse',
      'Broken at customer',
      'Decommissioned'
    ]
  )
  .service('availableSubscriptionPlans', function(SubscriptionPlan) {
    return SubscriptionPlan
      .query()
      .$promise;
  })
  .directive('onBlur', function() {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        el.bind('blur', function() {
          scope.$apply(attr.uiBlur);
        });
      }
    };
  })
  .factory('alertModal', function($q, $modal, $timeout) {
    return function alertModal(message) {
      var def = $q.defer();
      var modalInstance = $modal.open({
        template: '<small class="error">' + message + '</small>'
      });

      var tPromise = $timeout(function() {
        def.resolve();
        modalInstance.dismiss();
      }, 2000);

      modalInstance.result.finally(function() {
        def.resolve();
        $timeout.cancel(tPromise);
      });

      return def.promise;
    };
  });
