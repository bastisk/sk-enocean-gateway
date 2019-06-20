var express = require('express');
var models = require('../models');
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
        res.send(entry);
      });
});

// Delete Device
router.delete('/:id', function (req, res, next) {
    models.Device.destroy({ where: {id: req.params.id}});
    res.send(204);
});

// Update Device
router.put('/:id',  function (req, res, next) {
    models.Device.findOne({id: req.params.id}).then(device => {
        if (device) {
            device.name = req.body.name;
            device.eep = req.body.eep;
            device.deviceId = req.body.deviceId;
            device.manufacturer = req.body.manufacturer;
        }
        models.Device.update(device,  {where: { id: device.id}}).then(result => {
            if (result) {
                res.send(result);
            }
        });
    });
});

module.exports = router;
