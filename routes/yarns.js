var express = require('express');
var router = express.Router();
var Yarn = require('../app/models/yarn');

router.get('/', function(req, res, next) {
  Yarn.collection().fetch().then(function(yarns) {
    res.render('yarns/index', {yarns: yarns.toJSON()});
  });
});

module.exports = router;
