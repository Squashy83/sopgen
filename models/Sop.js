var mongoose = require('mongoose');

var StepSchema = new mongoose.Schema({
  number: Number,
  title: String,
  description: String,
  balloon: String
});

var ResponsibleSchema = new mongoose.Schema({
  name: String,
  position: String,
  telCode: String,
  emailCode: String
});

var concernPersonsSchema = new mongoose.Schema({
  name: String,
  position: String,
  telCode: String,
  emailCode: String
});

var HtmlSchema = new mongoose.Schema({
  body: String
});

var SopSchema = new mongoose.Schema({
  title: String,
  code: String,
  description: String,
  steps: [StepSchema],
  responsibles: [ResponsibleSchema],
  concernPersons: [concernPersonsSchema],
  action: {type: String, required: false},
  start: {type: String, required: false},
  expected_closure: {type: String, required: false},
  closure: {type: String, required: false},
  notes: {type: String, required: false},
  testedon: {type: String, required: false},
  implemented: {type: String, required: false},
  reviewed: {type: String, required: false},
  comments: {type: String, required: false},
  updated_date: {
    type: Date,
    default: Date.now,
    required: false
  },
});


module.exports = mongoose.model('Sop', SopSchema);
