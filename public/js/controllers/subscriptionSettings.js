'use strict';
angular.module('subscriptionSettings', [
  'helpers',
  'ngTable',
  'lbServices'
])
  .controller('subscriptionSettings', function
  (
    $q,
    $log,
    $scope,
    $timeout,
    ngTableParams,
    MaterialShippingUnit,
    SubscriptionPlan
  )
  {
    $scope.subA = [];
    $scope.subB = [];
    $scope.units = [];

    $scope.matTable = new ngTableParams({}, {
      counts: []
    });

    $scope.addUnit = function() {
      $scope.units.push({}) ;
    };

    $scope.saveUnit = function(unit) {
      $q.when(true)
        .then(function () {
          if (unit.name && unit.name.length > 0) {
            return MaterialShippingUnit.upsert({}, unit).$promise;
          } else {
            return $q.reject('Needs a name');
          }
        })
        .then(function (updatedUnit) {
          $log.debug('Success', updatedUnit);
          unit.$edit = false;
          /* $scope.units
            .forEach(function (unit) {
              if (unit.name === updatedUnit.name) {
                unit.id = updatedUnit.id;
              }
            })
          ;*/
        })
        .catch(function (err) {
          $log.debug(err);
          if (err.data) {
            $scope.saveUnitErr = err.data.error.message;
          } else {
            $scope.saveUnitErr = err;
          }
          $scope.clearUnitErr();
        })
      ;
    };

    $scope.deleteUnit = function (unitToDel) {
      $q.when(true)
        .then(function () {
          if (unitToDel && unitToDel.id) {
            return MaterialShippingUnit.deleteById({ id: unitToDel.id }).$promise;
          } else {
            return false;
          }
        })
        .then(function (success) {
          $log.debug('Success', success);
          $scope.units = _.chain($scope.units)
            .filter(function (unit) {
              return unit.name !== unitToDel.name;
            })
            .value()
          ;
        })
        .catch(function (err) {
          $scope.saveUnitErr = err.data.error.message;
          $scope.clearUnitErr();
        })
      ;
    };

    $scope.clearUnitErr = function() {
      $timeout(function () {
        $scope.saveUnitErr = null;
      }, 2500);
    };

    $scope.subATable = new ngTableParams({}, { counts: [] });

    $scope.addPlan = function(schema) {
      $scope[schema].push({ schema: schema });
    };

    $scope.deletePlan = function(planToDel) {
      $q.when(true)
        .then(function () {
          if (planToDel && planToDel.id) {
            return SubscriptionPlan.deleteById({ id: planToDel.id }).$promise;
          } else {
            return false;
          }
        })
        .then(function () {
          $log.debug('Success');
          $scope[planToDel.schema] = _.chain($scope[planToDel.schema])
            .filter(function (plan) {
              return plan.id !== planToDel.id;
            })
            .value()
          ;
        })
        .catch(function (err) {
          if (err.data) {
            $scope[planToDel.schema + 'Err'] = err.data.error.message;
          } else {
            $scope[planToDel.schema + 'Err'] = err;
          }
          $scope.clearPlanErr(planToDel.schema);
        })
      ;
    };

    $scope.savePlan = function(planToSave) {
      $log.debug('Saving', planToSave);
      $q.when(true)
        .then(function () {
          if (planToSave.name && planToSave.name.length > 0) {
            return SubscriptionPlan.upsert({}, planToSave).$promise;
          } else {
            return $q.reject('Plan needs a name');
          }
        })
        .then(function (updatedPlan) {
          $log.debug('Updated Plan', updatedPlan);
          planToSave.$edit = false;
        })
        .catch(function (err) {
          $log.debug(err);
          if (err.data) {
            $scope[planToSave.schema + 'Err'] = err.data.error.message;
          } else {
            $scope[planToSave.schema + 'Err'] = err;
          }
          $log.debug(planToSave.schema);
          $scope.clearPlanErr(planToSave.schema);
        })
      ;
    };

    $scope.clearPlanErr = function(schema) {
      $timeout(function () {
        $log.debug(schema);
        $scope[schema + 'Err'] = null;
      }, 2500);
    };

    MaterialShippingUnit.query().$promise
      .then(function (units) {
        $log.debug('Units', units);
        $scope.units = units;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;

    SubscriptionPlan.query().$promise
      .then(function (plans) {
        $log.debug('Plans', plans);
        $scope.plans = plans;
        _.chain(plans)
          .forEach(function (plan) {
            if (plan.schema === 'subA') {
              $scope.subA.push(plan);
            } else if (plan.schema === 'subB') {
              $scope.subB.push(plan);
            } else {
              $log.debug('No Schema Match', plan);
            }
          })
        ;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  })
;
