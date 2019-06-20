var enocean = require('node-enocean-utils');
var Devices = require('../models/device');
//var socket = require('socket.io-client')('http://localhost:3000');
//socket.on('connect', function(){console.log("Socket.IO client connected... ")});

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

enocean.teach({
  "id": "00000580E016",
  "eep":"A5-14-05",
  "name":"Shiter 1"
})

// Start the monitoring on Enocean Pi
enocean.startMonitor({
    'path':'/dev/ttyAMA0'
  }).then((gateway) => {
    console.log('The gateway was activated successfully:');
    console.log(JSON.stringify(gateway, null, '  '));
    // Set an event listener for 'data-known' events
    enocean.on('data-known', (telegram) => {
      let message = telegram['message'];
      //socket.emit('known-messages', message);
      console.log(telegram);
    });
    enocean.on('data-learn', (telegram) => {
    let device = telegram['message']['device'];
    console.log(device);
    console.log("I learned something: id: " + device['id'] + ", eep: " + device['eep'] + ", maufacturer: " + device['manufacturer']);

    });
    enocean.on('data-unknown', (telegram) => {
     let message = telegram['message']; 
     console.log("found shit." + message.device.id);
     if(message.device.id == '00000580E050'){
	var buf = telegram['message']['data_dl_buffer'];

        var supplyVoltageBuf = buf.readUInt8(0);
        var values = buf.readUInt8(3);
        console.log(values);
	if(values & 0b00000000) {
	 console.log("no vib");
	}
        if(values & 0b00000010) {
        console.log("vib");
	}     
}

        console.log(message);
   });
  }).catch((error) => {
    console.error(error);
  });
