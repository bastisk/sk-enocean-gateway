const SerialPort = require("serialport");
const Enocean = require("enocean-js");
const mqttclient = mqtt.connect("mqtt://localhost");
const pretty = Enocean.pretty;
const ESP3Parser = Enocean.ESP3Parser;

const port = new SerialPort("/dev/ttyAMA0", { baudRate: 57600 });
const parser = new ESP3Parser();
port.pipe(parser);

parser.on("data", (data) => {
  mqttclient.publish("data-unknown", JSON.stringify(telegram), (err) => {});
});

parser.on("data", pretty.logESP3);
