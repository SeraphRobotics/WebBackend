"use strict";
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    ObjectId  = Schema.ObjectId;

var PartSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  partNum: {
    type: String,
    required: true,
    unique: true
  },
  vendor: String,
  numInStock: Number,
  machineUsage: [
    {
      mType: String,
      quantity: Number
    }
  ],
  costPer: Number,
  batchSize: Number,
  expectedLeadTime: Number
});

module.exports = mongoose.model('Part', PartSchema);