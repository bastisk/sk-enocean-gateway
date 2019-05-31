var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
	id: String,
	eep: String,
    name: String,
    manufacturer: String
});

module.exports = mongoose.model('Device', deviceSchema);
