const mongoose = require("mongoose");

const meterSchema =mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    ID: Number,
    SerialNumber: String,
    ReadingDateTime: String,
    WH: String,
    VARH: String
});
module.exports = mongoose.model('Meter',meterSchema);
