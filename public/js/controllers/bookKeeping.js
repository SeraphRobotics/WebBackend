'use strict';
angular
  .module('app')
  .controller('bookKeeping', bookKeeping)
;

bookKeeping.$inject = [ '$q', '$log', '$scope', '$filter', 'Order' ];

function bookKeeping ($q, $log, $scope, $filter, Order) {
  var data = {};

  initController();

  $scope.startDateCap = startDateCap;
  $scope.endDateCap = endDateCap;
  $scope.createReport = createReport;
  $scope.pageData = pageData;

  pageData($scope.startDate, $scope.endDate);

  function initController () {
    $scope.currentDate = $filter('date')(new Date(), 'yyyy-MM-dd');
    $scope.endDate = $scope.currentDate;
    $scope.startDate = $filter('date')(new Date(2014, 2, 15), 'yyyy-MM-dd');
  }

  function startDateCap () {
    if (isThisBeforeThat($scope.startDate, $scope.endDate)) {
      return;
    } else {
      $scope.startDate = $filter('date')(new Date($scope.endDate), 'yyyy-MM-dd');
      return;
    }
  }

  function endDateCap () {
    var isBeforeToday = isThisBeforeThat($scope.endDate, $scope.currentDate);
    if (isBeforeToday) {
      if (isThisBeforeThat($scope.startDate, $scope.endDate)) {
        return;
      } else {
        $scope.endDate = $filter('date')(new Date($scope.startDate), 'yyyy-MM-dd');
      }
    } else {
        $scope.endDate = $scope.currentDate;
    }
  }

  $scope.reportHeader = [
    'Order Number',
    'Shipping Status',
    'Order Total',
    'Amount Paid',
    'Customer ID'
  ];

  function createReport () {
    var csvData = [];
    csvData = _.map(data.orders, function (order) {
      return {
        id: order.id,
        shippingStatus: (function () {
          if (order.isComplete) {
            return 'All items shipped';
          } else {
            return 'Not complete';
          }
        }()),
        orderTotal: order.cost,
        amountPaid: (function () {
          var paid = 0;
          _.forEach(order.payments, function (payment) {
            paid += payment.amount;
          });
          return paid;
        }()),
        customerId: order.customerId || 'Customer Data Missing'
      };
    });

    return csvData;
  }

  function pageData (startDate, endDate) {
    var filter = {
      filter: {
        where: {
          datePlaced: {
            between: [new Date(startDate), new Date(endDate)]
          }
        }
      }
    };

    Order.query(filter).$promise
      .then(function (orders) {
        $log.debug('Orders', orders);
        data.orders = orders;
      })
      .catch(function (err) {
        $log.debug(err);
      })
    ;
  }

  function isThisBeforeThat (startDate, endDate) {
    return new Date(startDate) <= new Date(endDate);
  }
}
