/*var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
	id: String,
	eep: String,
    name: String,
    manufacturer: String
});

module.exports = mongoose.model('Device', deviceSchema);*/

module.exports = function(sequelize, DataTypes) {
    var Device = sequelize.define("Device", {
        deviceId: DataTypes.STRING,
        eep: DataTypes.STRING,
        manufacturer: DataTypes.STRING,
        name: DataTypes.DATE
      });

    return Device;
};