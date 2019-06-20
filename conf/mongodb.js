// default to a 'localhost' configuration:
var connection_string = 'gw-user:oW7h^w\\USa3xKd.@=MeJ@cluster0-shard-00-00-ixuhy.mongodb.net:27017,cluster0-shard-00-01-ixuhy.mongodb.net:27017,cluster0-shard-00-02-ixuhy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}


module.exports = {
	//'url' : 'mongodb://<dbuser>:<dbpassword>@novus.modulusmongo.net:27017/<dbName>'
	'url' : 'mongodb://' + connection_string
}
