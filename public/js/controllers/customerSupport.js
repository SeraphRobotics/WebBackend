/* globals _  */
'use strict';
angular.module('customerSupport', [
  'lbServices',
  'helpers'
])
  .controller('customerSupport', function
  (
    $q,
    $log,
    $scope,
    Swap,
    Order,
    Machine,
    Customer,
    Shipment,
    Subscription,
    SubscriptionPlan,
    Cartridge,
    CartridgeCredit,
    machineTypes,    //This constant needs a name change, something like MACH_STATUS
    availableSubscriptionPlans // This is a promise
  )
  {
    availableSubscriptionPlans
      .then(function (plans) {
        $scope.plans = plans;
        $log.debug(plans);
      })
    ;

    $scope.findCust = function () {
      var id = {id: $scope.custId};
      Customer.findById({id: $scope.custId}).$promise
        .then(function (cust) {
          $log.debug(cust);
          $scope.customer = cust;
          $scope.swapCustError = false;
          return Customer.hasMachines(id).$promise;
        })
        .then(function (machines) {
          $log.debug('Machines: ', machines);
          if (machines.length === 1) {
            $scope.oldMachId = machines[0].id;
            $scope.ownedMachine = machines[0];
          }
          $scope.machines = machines;
          return Customer.currentSubscription(id).$promise;
        })
        .then(function (currentSubscription) {
          $log.debug('Current Subscription', currentSubscription);
          if (currentSubscription[0] !== 'n') {
            $scope.currentSubscription = currentSubscription;
            return SubscriptionPlan.findById({ id: currentSubscription.subscriptionPlanId }).$promise;
          } else {
            return false;
          }
        })
        .then(function (subscriptionPlan) {
          $log.debug('Subscription Plan', subscriptionPlan);
          if (subscriptionPlan) {
            $scope.currentSubscriptionPlan = subscriptionPlan;
            $scope.copyOfSubPlan = angular.copy(subscriptionPlan);
          } else {
            $scope.currentSubscriptionPlan = null;
          }
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.swapCustError = true;
        })
      ;
    };

    $scope.clearCustErr = function () {
      $scope.customer = undefined;
      $scope.swapCustError = false;
    };

    $scope.findOwnedMachine = function () {
      var machineReturn = null;
      $log.debug('find machine');
      if ($scope.customer && $scope.machines) {
        $log.debug('Searching');
        machineReturn = _.find($scope.machines, function (machine) {
          return machine.id === $scope.oldMachId;
        }, this) ;
      } else if (!$scope.customer) {
        $log.debug('No customer');
        $scope.findOwnedMachineError = 'Find customer first';
      }
      if (!machineReturn) {
        $log.debug('No Machine match');
        $scope.findOwnedMachineError = 'Customer does not currently own machine';
      } else {
        $scope.ownedMachine = machineReturn;
        machineReturn = undefined;
      }
    };

    $scope.clearOwnedMachineErr = function () {
      $scope.ownedMachine = null;
      $scope.findOwnedMachineError = null;
    };

    $scope.findNewMachine = function () {
      Machine.findById({id: $scope.newMachId})
        .$promise
        .then(function (machine) {
          $log.debug('machine found');
          $scope.newMachine = machine;
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.findNewMachineErr = 'Machine does not exist';
        })
      ;
    };

    $scope.clearNewMachineErr = function () {
      $scope.newMachine = null;
      $scope.findNewMachineErr = null;
    };

    $scope.submitSwap = function() {
      var swapData = {
        customerId: $scope.customer.id,
        oldMachineNum: $scope.ownedMachine.id
      };

      // A shipment with fedex needs to be made here
      Shipment.create({}, {trackingNum: 'test' + Math.floor((Math.random() * 100))})
        .$promise
        .then(function (shipment) {
          $log.debug(shipment);
          $scope.trackingNum = shipment.trackingNum;
          swapData.shipmentNum = shipment.id;
          return Swap.create({}, swapData).$promise;
        })
        .then(function (swap) {
          $log.debug(swap);
          machineTypes.forEach(function (type) {
            if (/(?=.*broken)(?=.*customer)/.exec(type.toLowerCase())) {
              $log.debug(type);
              $scope.ownedMachine.prevOwner = $scope.ownedMachine.ownedBy;
              $scope.ownedMachine.ownedBy = null;
              $scope.ownedMachine.machineStatus = type;
              $scope.ownedMachine.numOfServices =  $scope.ownedMachine.numOfServices || 0;
              $scope.ownedMachine.numOfServices += 1;
            }
          });
          return $scope.ownedMachine.$save();
        })
        .then(function (ownedMachine) {
          $log.debug('Machine Updated', ownedMachine);
          return Order.create({}, {
            type: 'swap',
            items: [
              {
                type: 'printer',
                status: 'unfulfilled',
                itemId: '',
                item: {}
              }
            ],
            customerId: $scope.customer.id
          })
          .$promise;
        })
        .then(function (swapOrder) {
          $log.debug('Order Placed', swapOrder);
        })
        .catch($log.debug)
      ;
    };

    $scope.findCartridge = function(id) {
      $log.debug('find cart');
      Cartridge.findById({ id: id})
        .$promise
        .then(function (cartridge) {
          $log.debug('Success');
          $log.debug(cartridge);
          $scope.cartridge = cartridge;
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.cartridgeErr = 'No Cartridge Found';
        })
      ;
    };

    $scope.clearCartridge = function() {
      $scope.cartridge = null;
      $scope.cartridgeErr = null;
    };

    $scope.submitCartridgeCredit = function(id) {
      id = id || null;
      $log.debug(id);
      var data = {
        customerId: $scope.customer.id,
        numOfCartridges: $scope.numOfCartridges,
        cartridgeId: id
      };
      CartridgeCredit.create(data)
        .$promise
        .then(function (credit) {
          $log.debug('credit Success');
          $scope.credit = credit;
        })
        .catch(function (err) {
          $log.debug(err);
          $scope.submitCartridgeCreditErr = 'Err';
        })
      ;
    };

    $scope.clearSubmitCartridgeErr = function() {
      $scope.submitCartirdgeCreditErr = null;
    };

    $scope.submitSubscription = function() {
      $scope.submitSubscriptionErr = null;
      $q
        .when(true)
        .then(function () {
          if (!$scope.customer) {
            $log.debug('submit');
            return $q.reject('No Customer Loaded');
          } else if (!$scope.currentSubscriptionPlan) {
            return $q.reject('No Subscription Selected');
          } else if ($scope.copyOfSubPlan &&
            ($scope.copyOfSubPlan.id === $scope.currentSubscriptionPlan.id))
          {
            return $q.reject('Customer is Already in Plan');
          } else { // Create new subscription for customer
            var data = {
              customerId: $scope.customer.id,
              subscriptionPlanId: $scope.currentSubscriptionPlan.id
            };
            return Subscription.create(data).$promise;
          }
        })
        .then(function (subscription) { // Assign subscription to current customer;
          $log.debug(subscription);
          $scope.customer.currentSubscriptionId = subscription.id;
          return $scope.customer.$save();
        })
        .then(function (customer) { // Add end date to last subscription
          $log.debug(customer);
          if ($scope.currentSubscription) {
            $scope.currentSubscription.dateEnd = new Date();
            return $scope.currentSubscription.$save();
          } else {
            return false;
          }
        })
        .then(function (oldSubscriptionPlan) {
          $log.debug(oldSubscriptionPlan);
          $log.debug('Complete');
        })
        .catch(function (err) {
          if (err.message) {
            $log.debug('here');
            $scope.submitSubscriptionErr = err.message;
          } else {
            $log.debug(err);
          }
        })
      ;
    };

    $scope.clearSubErr = function() {
      $log.debug('Change Sub');
    };
  })
;
