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

const ledFields = {
    index: String,
    name: String,
    creator: String,
    create_time : Date,
    category: String,
    downloadcnt: Number,
    type: String,
};

const ledSchema = new schema(ledFields, { collection: 'led', bufferCommands: false }),
    db = {
	      led: mongooseCon.model('led', ledSchema),
    };

module.exports = {
    getDB: () => db,
    getFields: () => ledFields
};
