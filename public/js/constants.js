angular.module('app.constants', [])
  .constant('machineTypes', [
    'Operational in warehouse',
    'Operational at customer',
    'Assigned to shipment',
    'In transit to warehouse',
    'In transit to Customer',
    'Broken in warehouse',
    'Broken at customer',
    'Decommissioned'
  ]);
