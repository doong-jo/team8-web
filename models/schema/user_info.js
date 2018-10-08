const mongoose = require('mongoose');
const mongooseSchema = require('mongoose').Schema,
      schema = mongooseSchema;

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
	useNewUrlParser: true
};

let mongooseCon = mongoose.createConnection('mongodb://localhost:27017/admin', option);

const userFields = {
	id: String,
	passwd: String,
	email: String,
	type: String,
    emergency: Boolean,
    lastAccess: Date,
    lastPosition: Array,
    ledIndicies: Array,
    trackIndicies: Array,
};

const userSchema = new schema(userFields, { collection: 'user', bufferCommands: false }),
      db = {
	      user: mongooseCon.model('user', userSchema),
      };

module.exports = {
	getDB: () => db,
	getFields: () => userFields
};
