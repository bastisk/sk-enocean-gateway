var enocean = require('node-enocean-utils');
var Devices = require('../models/device');
var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){console.log("Socket.IO client connected... ")});

// init the tool with all already existing devices from db.
function initEnocean(){
    Devices.find(function(err, devices) {
        if(devices.length){
            devices.forEach((device) => {
                enocean.teach({
                    "id": device.id,
                    "eep": device.eep,
                    "name": device.name
                })
            });
        }
    });
}

// Start the monitoring on Enocean Pi
enocean.startMonitor({
    'path':'/dev/ttyS0'
  }).then((gateway) => {
    console.log('The gateway was activated successfully:');
    console.log(JSON.stringify(gateway, null, '  '));
    // Set an event listener for 'data-known' events
    enocean.on('data-known', (telegram) => {
      let message = telegram['message'];
      socket.emit('known-messages', message);
      console.log(message['device']['name'] + ': ' + message['desc']);
    });
  }).catch((error) => {
    console.error(error);
  });