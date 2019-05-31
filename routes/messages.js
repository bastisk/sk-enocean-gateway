var express = require('express');
var Message = require('../models/message');
var jwtf = require('../conf/jwt');
var router = express.Router();

// GET all Messages
router.get('/', jwtf.auth, function (req, res, next) {
    Message.find(function (err, messages) {
        res.send(messages);
    });
});

// GET single Messages
router.get('/:id', jwtf.auth, function (req, res, next) {
    Message.findbyId(req.params.id, function (err, messages) {
        res.send(messages);
    });
});

// Delete Message
router.delete('/:id', jwtf.auth, function (req, res, next) {
    Message.remove({ _id: req.params.id }, function (err) {
        console.log(err);
        res.send("k");
    });
});


module.exports = router;
