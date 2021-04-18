const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    title: {
        type: String, required: true
    },
    // location is disabled for now and moved to line 18!
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    participant: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    date: {type: String, format: Date, required: true},
    time: {
        "type": "string",
        "format": "time"
        }

}, { timestamps: true })

module.exports =mongoose.model('Event', eventSchema)

// location: { type: Schema.Types.ObjectId, ref: 'Location'},