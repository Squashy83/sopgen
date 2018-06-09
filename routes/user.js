var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET ALL UserS */
// router.get('/', function (req, res, next) {
//   User.find(function (err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
// });

/* GET SINGLE User BY ID */
router.get('/sopgen/:id/:passwd', function (req, res, next) {
  User.findOne({
    'userid': req.params.id,
    'password': req.params.passwd
  }, function (err, post) {
    //if (err) return next(err);
    if (err || post === null)
      return res.json({
        success: false,
        message: 'user not found',
        user: req.params.id,
        password: req.params.passwd
      });
    else
      return res.json({
        success: true,
        message: 'login OK',
        user: post
      });
    //res.json(post);
  });
});

/* SAVE User */
// router.post('/', function (req, res, next) {
//   User.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* UPDATE User */
// router.put('/:id', function (req, res, next) {
//   User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* DELETE User */
// router.delete('/:id', function (req, res, next) {
//   User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;
