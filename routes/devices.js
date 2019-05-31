var express = require('express');
var Device = require('../models/device');
var jwtf = require('../conf/jwt');
var router = express.Router();

// GET all Devices
router.get('/', jwtf.auth, function (req, res, next) {
    Device.find(function (err, devices) {
        res.send(devices);
    });
});

// GET single Devices
router.get('/:id', jwtf.auth, function (req, res, next) {
    Device.findbyId(req.params.id, function (err, devices) {
        res.send(devices);
    });
});

// Create new Device
router.post('/', jwtf.auth, function (req, res, next) {
    var new_device = new Device({ id: req.body.id, eep: req.body.eep, name: req.body.name, manufacturer: req.body.manufacturer });
    new_device.save(function (err) {
        console.log(err);
    });
    res.send(new_device);
});

// Delete Device
router.delete('/:id', jwtf.auth, function (req, res, next) {
    Device.remove({ _id: req.params.id }, function (err) {
        console.log(err);
        res.send("k");
    });
});

// Update Device
router.put('/:id', jwtf.auth, function (req, res, next) {
    Device.findbyId(req.params.id, function (err, device) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        if (device) {
            device.name = req.body.name;
            device.eep = req.body.eep;
            device.id = req.body.id;
            device.manufacturer = req.body.manufacturer;
        }
        device.save(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            }
        });
    });
});

module.exports = router;
