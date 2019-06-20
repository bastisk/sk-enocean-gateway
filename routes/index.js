var express = require('express');
var router = express.Router();
var pjson = require('../package.json');


/* GET home page. */
//Use middleware to protect routes
router.get('/', function(req, res, next) {
  res.render('index', {version: pjson.version});
});


module.exports = router;
