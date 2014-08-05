/* globals describe, beforeEach, it */
/* jshint expr: true */

'use strict';
var
  chai           = require('chai'),
  sinon          = require('sinon'),
  sinonChai      = require('sinon-chai'),
  customerRemote = require(process.cwd() + '/remoteMethod/customer'),
  anticipate     = chai.expect
;

chai.should();
chai.use(sinonChai);

describe('Customer remote method', function () {
  var
    app       = {},
    loopback  = {},
    findCustomer,
    customer,
    findMachine,
    machine,
    options,
    newMethod
  ;

  beforeEach(function () {
    findCustomer = sinon.stub();
    findMachine = sinon.stub();
    app = {
      models : {
        customer: {},
        machine: {}
      }
    };
    app.models.customer.findById = findCustomer;
    app.models.machine.findById  = findMachine;

    loopback.remoteMethod = function (meth, opts) {
      newMethod = meth;
      options = opts;
    };
    customer = {
      name: 'Bob'
    };
    machine = {
      belongsTo: null,
      customer: function (cust) {
        this.belongsTo = cust;
      }
    };
  });

  it('should call loopback.remoteMethod', function () {
    var rMethSpy = sinon.spy(loopback, 'remoteMethod');
    customerRemote(app, loopback);
    rMethSpy.should.have.been.calledOnce;
  });

  it('should call remoteMethod with a function' , function () {
    customerRemote(app, loopback);
    anticipate(newMethod).to.be.a('function');
  });

  describe('Customer findById method', function () {
    beforeEach(function () {
      customerRemote(app, loopback);
      findMachine.yields(null, machine);
    });
    it('should be called', function (done) {
      findCustomer.yields(null, customer);
      newMethod('1337', '22', function () {
        findCustomer.should.have.been.calledOnce;
        done();
      });
    });

    it('should respond to failure like a champ', function (done) {
      var err = new Error('Stiff upper lip');
      findCustomer.yields(err);
      newMethod('1337', '22', function (returnedErr) {
        findCustomer.should.have.been.calledOnce;
        err.should.deep.equal(returnedErr);
        done();
      });
    });
  });
  describe('Machine findById method', function () {
    beforeEach(function () {
      customerRemote(app, loopback);
      findCustomer.yields(null, customer);
    });

    it('should be called', function (done) {
      findMachine.yields(null, machine);
      newMethod('1337', '22', function () {
        findMachine.should.have.been.calledOnce;
        done();
      });
    });

    it('should respond to failure like a champ', function (done) {
      var err = new Error({ message: 'Stiff upper lip'});
      findMachine.yields(err);
      newMethod('1337', '22', function (returnedErr) {
        findMachine.should.have.been.calledOnce;
        err.should.deep.equal(returnedErr);
        done();
      });
    });
  });

  it('assigns customer to machine', function (done) {
    customerRemote(app, loopback);
    findCustomer.yields(null, customer);
    findMachine.yields(null, machine);

    newMethod('1337', '22', function () {
      anticipate(machine.belongsTo).to.exist;
      machine.belongsTo.should.equal(customer);
      done();
    });
  });

});
