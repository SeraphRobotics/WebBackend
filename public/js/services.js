'use strict';
angular.module('helpers', [
  'lbServices'
])
  .constant('machineTypes',
    [
      'Operational in warehouse',
      'In transit to warehouse',
      'In transit to Customer',
      'Broken in warehouse',
      'Broken at customer',
      'Operational at Customer',
      'Decommissioned'
    ]
  )
;
