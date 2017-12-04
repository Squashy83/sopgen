var mongoose = require('mongoose');

var StepSchema = new mongoose.Schema({
  number: Number,
  title: String,
  description: String,
  balloon: String
});



var SopSchema = new mongoose.Schema({
  title: String,
  code: String,
  description: String,
  steps: [StepSchema],
  action: String,
  start: String,
  expected_closure: String,
  closure: String,
  notes: String,
  testedon: String,
  implemented: String,
  reviewed: String,
  comments: String,
  updated_date: {
    type: Date,
    default: Date.now
  },
});


module.exports = mongoose.model('Sop', SopSchema);
