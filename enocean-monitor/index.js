/**
 * Forwards all messages from Enocean into a local MQTT broker.
 */
var enocean = require('node-enocean-utils');
var mqtt = require('mqtt');
var config = require('config');
var mqttclient = mqtt.connect(config.get('mqtt'));

// Start the monitoring on Enocean Pi
enocean.startMonitor({
    'path': config.get('usbpath')
}).then((gateway) => {
    console.log('The gateway was activated successfully:');
    console.log(JSON.stringify(gateway, null, '  '));

    enocean.on('data-known', (telegram) => {
        mqttclient.publish('data-known', telegram);
    });

    enocean.on('data-learn', (telegram) => {
        mqttclient.publish('data-learn', telegram);
    });

    enocean.on('data-unknown', (telegram) => {
        mqttclient.publish('data-unknown', telegram);
    });

}).catch((error) => {
    console.error(error);
});

// Start the Monitoring on MQTT
mqttclient.on('connect', () => {
    mqttclient.subscribe('teach-in', (err) => {})
});

mqttclient.on('message', (topic, message) => {
    if(topic == 'teach-in'){
        try {
            enocean.teach(message);
            console.log('Teach In successful message: ' + message);
        } catch(e) {
            console.log('Failed to teach in message: ' + message);
        }   
    }
});