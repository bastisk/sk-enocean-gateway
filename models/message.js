var mongoose = require('mongoose'), Schema = mongoose.Schema;

var messageSchema = mongoose.Schema({
   messageString: String,
   device_id: {type: Schema.Types.ObjectId, rel: 'Device'},
});

module.exports = mongoose.model('Message', messageSchema);
