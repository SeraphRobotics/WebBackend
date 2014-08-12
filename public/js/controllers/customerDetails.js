/* globals _ */
'use strict';
angular.module('customerDetails', [
  'lbServices'
])
  .controller('customerDetails', function
  (
    $q,
    $log,
    $scope,
    $filter,
    Order,
    Customer,
    Subscription
  )
  {
    $scope.endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
    /**
     * finds related items after customer is identified
     */
    function findCustomerRelations(id) {
      var def = $q.defer();
      $q
        .when(true) //Ideally, this should be done in parallel using $q.all()
        .then(function () {
          return Customer.currentSubscription(id).$promise;
        })
        .then(function (subscription) {
          $log.debug(subscription);
          $scope.subscription = subscription;
          return Subscription.subscriptionPlan({ id: subscription.id }).$promise;
        })
        .then(function (subscriptionPlan) {
          $log.debug(subscriptionPlan);
          $scope.subscriptionPlan = subscriptionPlan;
          return Customer.order(id).$promise;
        })
        .then(function (orders) {
          $log.debug(orders);
          $scope.orders = orders;
          return Customer.filamentChange(id).$promise;
        })
        .then(function (filamentChanges) {
          $log.debug(filamentChanges);
          $scope.filamentChanges = filamentChanges;
          return Customer.machineSwap(id).$promise;
        })
        .then(function (swaps) {
          $log.debug(swaps);
          $scope.swaps = swaps;
          return Customer.hasMachines(id).$promise;
        })
        .then(function (machinesOwned) {
          $log.debug(machinesOwned);
          $scope.machines = machinesOwned;
          return Customer.cartridge(id).$promise;
        })
        .then(function (cartridges) {
          $log.debug(cartridges);
          $scope.cartridges = cartridges;
          return Customer.cartridgesReturned(id).$promise;
        })
        .then(function (cartridgesReturned) {
          $log.debug(cartridgesReturned);
          $scope.cartridgesReturned = cartridgesReturned;
          def.resolve(true);
        })
        .catch(def.reject)
      ;
      return def.promise;
    }

    $scope.findCustomer = function (custId) {
      $log.debug(custId);
      $scope.customer = null;
      var id = {id: custId};
      $q.when(true)
        .then(function () {
          if (custId && custId.length > 6) {
            return Customer.findById(id).$promise;
          } else {
            return $q.reject('Id must be larger than 6 Charectors');
          }
        })
        .then(function (customer) {
          $log.debug('here');
          $log.debug(customer);
          $scope.customer = customer;
          return findCustomerRelations(id);
        })
        .catch(function (err) {
          $log.debug(err);
          if (typeof err === 'string') {
            $scope.custIdErr = err;
          } else if (err.data) {
            $scope.custIdErr = err.data.error.message;
          } else if (err.message) {
            $scope.custIdErr = err.message;
          } else {
            $scope.custIdErr = 'Error: ' + JSON.stringify(err);
          }
        })
      ;
    };

    $scope.clearCustIdErr = function() {
      $scope.custIdErr = null;
    };

    $scope.findCustomerThroughOrder = function (orderId) {
      $scope.customer = null;
      $q.when(true)
        .then(function () {
          if (orderId && orderId.length > 6) {
            return Order.customer({ id: orderId }).$promise;
          } else {
            return $q.reject('Order ID must be larger than 6 characters');
          }
        })
        .then(function (customer) {
          $log.debug(customer);
          $scope.customer = customer;
          return findCustomerRelations({ id: customer.id });
        })
        .catch(function (err) {
          if (typeof err === 'string') {
            $scope.orderIdErr = err;
          } else if (err.data) {
            $scope.orderIdErr = err.data.error.message;
          } else if (err.message) {
            $scope.orderIdErr = err.message;
          } else {
            $scope.custIdErr = 'Error: ' + JSON.stringify(err);
          }
        })
      ;
    };

    $scope.clearOrderIdErr = function() {
      $scope.orderIdErr = null;
    };

    $scope.updateCartridgeDateRange = function() {
      if (!$scope.cartridges) {
        return false;
      }
      $scope.numberUsedWithinRange = 0;
      _.chain($scope.cartridges)
        .map(function (cartridge) {
          return { soldOnDate: new Date(cartridge.soldOnDate) };
        })
        .filter(function (cartridge) { //filter those before range
          return cartridge.soldOnDate > new Date($scope.startDate);
        })
        .filter(function (cartridge) {
          return cartridge.soldOnDate < new Date($scope.endDate);
        })
        .forEach(function () {
          $scope.numberUsedWithinRange += 1;
        })
      ;
    };

    $scope.isLessThanEnd = true;
    $scope.startDateRangeCheck = function() {
      if (!$scope.startDate || !$scope.endDate) {
        $scope.isLessThanEnd = true;
      } else if (new Date($scope.startDate) < new Date($scope.endDate)) {
        $scope.isLessThanEnd = true;
        $scope.updateCartridgeDateRange();
      } else {
        $scope.isLessThanEnd = false;
      }
    };

    $scope.isGreaterThanStart = true;
    $scope.endDateRangeCheck = function() {
      if (!$scope.startDate || !$scope.endDate) {
        $scope.isGreaterThanStart = true;
      } else if (new Date($scope.startDate) < new Date($scope.endDate)) {
        $scope.isGreaterThanStart = true;
        $scope.updateCartridgeDateRange();
      } else {
        $scope.isGreaterThanStart = false;
      }
    };
  })
  .directive('updateCustomer', function ($log) {
    return {
      restrict: 'A',
      scope: {
        customer: '=cust'
      },
      link: function (scope, el) {
        el.bind('blur', function () {
          $log.debug(scope.customer);
          scope.customer.$save()
            .then(function () {
              $log.debug('success');
            })
            .catch($log.debug)
          ;
        });
      }
    };
  })
;
