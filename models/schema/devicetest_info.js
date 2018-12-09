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

const devicetestFields = {
    occured_date: Date,
    complimentary: Number,
    roll: Number,
    accel: Number,
};

const devicetestSchema = new schema(devicetestFields, { collection: 'devicetest', bufferCommands: false }),
    db = {
        devicetest: mongooseCon.model('devicetest', devicetestSchema),
    };

module.exports = {
    getDB: () => db,
    getFields: () => devicetestFields
};
