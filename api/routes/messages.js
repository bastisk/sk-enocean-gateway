var express = require('express');
var Message = require('../models/message');
var router = express.Router();
var models = require('../models');

// GET all Messages
router.get('/', function (req, res, next) {
    models.Message.findAll().then( messages => {
        res.send(messages);
    });
});

// GET single Messages
router.get('/:id', function (req, res, next) {
    models.Message.find({id: req.params.id}).then(messages => {
        res.send(messages);
    });
});

// Create new Message
router.post('/',  function (req, res, next) {
    var new_message = { deviceId: req.body.deviceId, messageString: req.body.messagrString };
    models.Message.create(new_message).then(entry => {
        res.send(entry);
      });
});


// Delete Message
router.delete('/:id', function (req, res, next) {
    models.Message.destroy({ id: req.params.id }).then(result => {
        console.log(result);
        res.send("k");
    });
});


module.exports = router;
