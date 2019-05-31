var express = require('express');
var User = require('../models/user');
var jwtf = require('../conf/jwt');
var router = express.Router();
var pjson = require('../package.json');


/* GET home page. */
//Use middleware to protect routes
router.get('/', function(req, res, next) {
  res.render('index', {version: pjson.version});
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (username == '' || password == '') {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid credentials"
    });
    return;
  }

  //Find user and generate token
  User.findOne({ username: username }, function(err, user) {
      if (err) res.json(err);
      if (!user) res.json({ message: 'Incorrect username.' });
      else {
      user.comparePassword(password, function(err, isMatch) {
        if (isMatch) {
          res.json(jwtf.genToken(username));
        } else {
          res.json({"status": 401,"message": "Invalid credentials"});
        }
      });
    }
    });

});

router.post('/register', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  let message = "";

  //Find user and generate token
  User.findOne({ username: username }, function(err, user) {
    if(err) res.json(err);
    if(!user){
      User.create({username: username, password: password, role: "0"});
      res.status(200).send({message: "Created User"})
    } else {
      res.status(409).send({});
    }
  });



});

module.exports = router;
