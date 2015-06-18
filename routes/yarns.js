var express = require('express');
var router = express.Router();
var Yarn = require('../app/models/yarn');

router.get('/', function(req, res, next) {
  Yarn.collection().fetch().then(function(yarns) {
    res.render('yarns/index', {yarns: yarns.toJSON()});
  });
});

router.get('/new', function(req, res, next) {
  res.render('yarns/new');
});

router.post('/', function(req, res, next) {
  Yarn.forge({
    name: req.body['yarn[name]'],
    colorway: req.body['yarn[colorway]'],
    weight: req.body['yarn[weight]'],
    yardage: req.body['yarn[yardage]'],
    yardage: req.body['yarn[yardage]'],
    ounces: req.body['yarn[ounces]'],
    discontinued: req.body['yarn[discontinued]']
  })
  .save()
  .then(function(yarn) {
    res.redirect('/yarns');
  })
  .catch(function(err) {
    return console.error(err);
  });
});

router.get('/:id/edit', function(req, res, next) {
  new Yarn({id: req.params.id})
  .fetch()
  .then(function(yarn) {
    res.render('yarns/edit', {yarn: yarn.toJSON()});
  });
});

router.post('/:id', function(req, res, next) {
  new Yarn({
    id: req.params.id,
    name: req.body['yarn[name]'],
    colorway: req.body['yarn[colorway]'],
    weight: req.body['yarn[weight]'],
    yardage: req.body['yarn[yardage]'],
    yardage: req.body['yarn[yardage]'],
    ounces: req.body['yarn[ounces]'],
    discontinued: req.body['yarn[discontinued]']
  }).save().then(function(yarn) {
    res.redirect('/yarns');
  });
});

router.get('/:id/delete', function(req, res, next) {
  new Yarn({id: req.params.id})
  .destroy()
  .then(function(yarn) {
    res.redirect('/yarns');
  });
});

router.get('/:id', function(req, res, next) {
  new Yarn({id: req.params.id})
  .fetch()
  .then(function(yarn) {
    res.render('yarns/show', {yarn: yarn.toJSON()});
  });
});

module.exports = router;
