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

const accidentchartFields = {
    name: String,
    type: String,
    parent: String,
    occured_dates: Array,
    riding_type: String,
};

const accidentSchema = new schema(accidentchartFields, { collection: 'accidentchart', bufferCommands: false }),
    db = {
        accidentchart: mongooseCon.model('accidentchart', accidentSchema),
    };

module.exports = {
    getDB: () => db,
    getFields: () => accidentchartFields
};
