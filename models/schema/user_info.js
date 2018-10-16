const mongoose = require('mongoose');
const mongooseSchema = require('mongoose').Schema,
      schema = mongooseSchema;

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
	useNewUrlParser: true
};

let mongooseCon = mongoose.createConnection('mongodb://josungdong:01034823161@localhost:25321/admin', option);

const userFields = {
	email: String,
	passwd: String,
	name: String,
	phone: String,
	riding_type: String,
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
