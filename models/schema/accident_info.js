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

const accidentFields = {
    user_id: String,
    riding_type: String,
    occured_date: Date,
    position: Object,
    has_alerted: Boolean,
    accel: Number,
    rollover: Number,
    realAddress: String,
};

const accidentSchema = new schema(accidentFields, { collection: 'accident', bufferCommands: false }),
    db = {
        accident: mongooseCon.model('accident', accidentSchema),
    };

module.exports = {
    getDB: () => db,
    getFields: () => accidentFields
};
