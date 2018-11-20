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

const categoryFields = {
    name: String,
    backgroundColor: String,
    notice: String,
    character: String,
};

const categorySchema = new schema(categoryFields, { collection: 'category', bufferCommands: false }),
    db = {
	      category: mongooseCon.model('category', categorySchema),
    };

module.exports = {
    getDB: () => db,
    getFields: () => categoryFields
};
