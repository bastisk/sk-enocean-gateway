const SerialPort = require("serialport");
const mqtt = require("mqtt");
const Enocean = require("enocean-js");
const mqttclient = mqtt.connect("mqtt://localhost");
const pretty = Enocean.pretty;
const ESP3Parser = Enocean.ESP3Parser;
const ESP3Transformer = Enocean.ESP3Transformer
const parser = new ESP3Parser()
const transformer = new ESP3Transformer()

const port = new SerialPort("/dev/ttyAMA0", { baudRate: 57600 });

port.pipe(parser).pipe(transformer)


transformer.on('data', async data => {
    //console.log(data.decode("d2-50-00"))
    if (data && data.constructor.name === "RadioERP1") {
      if(data.teachIn){
        var teachInInfo = data.teachInInfo
        console.log(teachInInfo,data.RSSI)
    }
  })

