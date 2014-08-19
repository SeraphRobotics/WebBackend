'use strict';
angular.module('helpers', [
  'lbServices'
])
  .constant('machineTypes',
    [
      'Operational in warehouse',
      'Assigned to Shipment',
      'In transit to warehouse',
      'In transit to Customer',
      'Broken in warehouse',
      'Broken at customer',
      'Operational at Customer',
      'Decommissioned'
    ]
  )
  .service('availableSubscriptionPlans', function (SubscriptionPlan) {
    return SubscriptionPlan
      .query()
      .$promise
    ;
  })
  .filter('addressArrToOneLine', function () {
    return function (input) {
      if (input && _.isObject(input)) {
        var str = input.street + ', ' + input.city + ', ' +  input.state + ', ' + input.zip;
        return str;
      } else {
        return '';
      }
    };
  })
  .filter('telephone', function () {
    return function (tel) {
      if (!tel || !_.isString(tel)) { return ''; }
      var value = tel.toString().trim().replace(/^\+/, '');
      if (value.match(/[^0-9]/)) {
        return tel;
      }
      var country, city, number;
      switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
          country = 1;
          city = value.slice(0, 3);
          number = value.slice(3);
          break;
        case 11: // +CPPP####### -> CCC (PP) ###-####
          country = value[0];
          city = value.slice(1, 4);
          number = value.slice(4);
          break;
        case 12: // +CCCPP####### -> CCC (PP) ###-####
          country = value.slice(0, 3);
          city = value.slice(3, 5);
          number = value.slice(5);
          break;
        default:
          return tel;
      }
      if (country === 1) {
        country = '';
      }
      number = number.slice(0, 3) + '-' + number.slice(3);
      return (country + ' (' + city + ') ' + number).trim();
    };
  })
;
