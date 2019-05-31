//Simple JWT Token Generation and Expiring Module
var jwt = require('jwt-simple');
var User = require('../models/user');
var secret = 'iweofpqwn234u02340cmnqw92cn';

module.exports.genToken = function(user) {
  var expires = expiresIn(2); //number in Days
  var token = jwt.encode({exp: expires}, secret);
  return {token: token, expires: expires, user: user};
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

//Authentication Middleware
module.exports.auth = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  if (token || key) {
    try{
      var decoded = jwt.decode(token, secret);
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({"status": 400,"message": "Token Expired"});
        return;
      }

      User.findOne({username: key}, function(err, user){
        if(err) res.json({"status": 500,"message": "Error"});
        if(user) next();
        else res.json({"status": 401,"message": "No such user"})
      });
    } catch(err){
      res.json({'ERROR':err});
    }

  } else {
    res.status(401).send();
  }
}
