/**
 * Forwards all messages from Enocean into a local MQTT broker.
 */
var enocean = require('node-enocean-utils');
var request = require('request');
var mqtt = require('mqtt');
var config = require('config');
var mqttclient = mqtt.connect(config.get('mqtt'));
var cTable = require('console.table');
// Get existing devices and teach em

request.get(config.get('apiUrl') + '/api/devices', (err, resp, body) => {
    let parsed = JSON.parse(body);
    console.log('Connected to API, found ' + parsed.length + ' devices to learn in!');
    console.table(parsed);
    parsed.forEach(device => {
        enocean.teach({
            "id": device.deviceId,
            "eep": device.eep,
            "name": device.name
        });
    });
});

// Start the monitoring on Enocean Pi
enocean.startMonitor({
    'path': config.get('usbpath')
}).then((gateway) => {
    console.log('The gateway was activated successfully:');
    console.log(JSON.stringify(gateway, null, '  '));

    enocean.on('data-known', (telegram) => {
        mqttclient.publish('data-known', JSON.stringify(telegram));
    });

    enocean.on('data-learn', (telegram) => {
        mqttclient.publish('data-learn', JSON.stringify(telegram));
    });

    enocean.on('data-unknown', (telegram) => {
        
        mqttclient.publish('data-unknown', JSON.stringify(telegram), (err) => {
	});
    });

}).catch((error) => {
    console.error(error);
});

// Start the Monitoring on MQTT
mqttclient.on('connect', () => {
  console.log("Connected to MQTT Broker..");  
  mqttclient.subscribe('teach-in', (err) => {})
});

mqttclient.on('message', (topic, message) => {
    if(topic == 'teach-in'){
        try {
            console.log(message);
            let parsed = JSON.parse(message);
            let msg = {"eep": parsed.eep, "id": parsed.deviceId, "name": parsed.name};
            enocean.teach(msg);
            console.log('Teach In successful message: ' + msg);
        } catch(e) {
            console.log('Failed to teach in message: ' + e);
        }   
    }
});
