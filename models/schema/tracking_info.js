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

const trackingFields = {
	tracking: String,
	title: String,
	post_date: Date,
	href: String,
};

const trackingSchema = new schema(trackingFields, { collection: 'tracking', bufferCommands: false }),
      db = {
	      tracking: mongooseCon.model('tracking', trackingSchema),
      };

module.exports = {
	getDB: () => db,
	getFields: () => trackingFields
};
