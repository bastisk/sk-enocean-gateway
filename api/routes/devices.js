var express = require('express');
var models = require('../models');
var mqtt = require('mqtt');
var mqttclient = mqtt.connect('mqtt://localhost');
var router = express.Router();

// GET all Devices
router.get('/', function (req, res, next) {
    models.Device.findAll().then(devices => {
        res.send(devices);
    });
});

// GET single Devices
router.get('/:id', function (req, res, next) {
    models.Device.findOne({id: req.params.id}).then(devices => {
        res.send(devices);
    });
});

// Create new Device
router.post('/',  function (req, res, next) {
    var new_device = { deviceId: req.body.deviceId, eep: req.body.eep, name: req.body.name, manufacturer: req.body.manufacturer };
    models.Device.create(new_device).then(entry => {
        mqttclient.publish('teach-in', JSON.stringify({eep: new_device.eep, deviceId: new_device.deviceId, name: new_device.name}));
        res.send(entry);
      });
});

// Delete Device
router.delete('/:id', function (req, res, next) {
    models.Device.destroy({ where: {id: req.params.id}});
    res.send({});
});

// Update Device
router.put('/:id',  function (req, res, next) {
    models.Device.findOne({id: req.params.id}).then(device => {
        let update;
        if (device) {
            update = {
                name: req.body.name,
                eep: req.body.eep,
                deviceId: req.body.deviceId,
                manufacturer: req.body.manufacturer
            }
      
        }
        models.Device.update(update,  {where: { id: req.params.id}}).then(result => {
            if (result) {
                res.send(result);
            }
        });
    });
});

module.exports = router;
