var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sop = require('../models/Sop.js');

/* GET ALL SopS */
router.get('/', function (req, res, next) {
  Sop.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Sop BY ID */
router.get('/:id', function (req, res, next) {
  Sop.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Sop */
router.post('/', function (req, res, next) {
  Sop.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Sop */
router.put('/:id', function (req, res, next) {
  Sop.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Sop */
router.delete('/:id', function (req, res, next) {
  Sop.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
