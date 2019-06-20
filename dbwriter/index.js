/**
 * Writes messages to db via API.
 */
var mqtt = require('mqtt');
var config = require('config');
var request = require('request');
var mqttclient = mqtt.connect(config.get('mqtt'));

// Start the Monitoring on MQTT
mqttclient.on('connect', () => {
    mqttclient.subscribe('data-known', (err) => { });
    mqttclient.subscribe('data-unknown', (err) => { });
    mqttclient.subscribe('data-learn', (err) => { });
});

mqttclient.on('message', (topic, message) => {
    postnewMessage(message, topic);
});

async function postnewMessage(telegram, type) {
    let result = await request.post(config.get('apiUrl') + '/api/messages',
        {
            deviceId: telegram.message.device.id,
            messageString: telegram.message,
            messageType: type
        });
}