'use strict';
var Q = require('q');

module.exports = function (app, loopback) {
  var Customer = app.models.customer;
  var Machine  = app.models.machine;

  Customer.ownsMachine = function (id, fk, done) {
    var findCustomer = Q.nbind(Customer.findById, Customer, id);
    var findMachine  = Q.nbind(Machine.findById, Machine, fk);
    var customer;
    findCustomer()
      .then(function () {
        customer = Array.prototype.slice.call(arguments)[0];
        return findMachine();
      })
      .then(function (machine) {
        machine.customer(customer);
        done(null);
      })
      .catch(function (err) {
        done(err);
      })
    ;
  };

  var options = {
    accepts: [
      {
        arg: 'machineId',
        type: 'String',
        required: true,
        description: 'Machine Id',
        http: {
          source: 'query'
        }
      },
      {
        arg: 'machineId',
        type: 'String',
        required: true,
        description: 'Machine Id',
        http: {
          source: 'query'
        }
      }
    ],
    http: {
      path: '/addMachine',
      verb: 'post'
    }
  };
  loopback.remoteMethod(Customer.ownsMachine, options);
};
