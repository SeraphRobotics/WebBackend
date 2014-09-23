'use strict';
angular.module('helpers', [
  'lbServices'
])
  .service('availableSubscriptionPlans', function(SubscriptionPlan) {
    return SubscriptionPlan
      .query()
      .$promise;
  })
  .directive('onBlur', function() { //This needs to be replaced by ng-blur
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
