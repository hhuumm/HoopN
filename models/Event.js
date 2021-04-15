const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    title: {
        type: String, required: true
    },
    location: { type: Schema.Types.ObjectId, ref: 'Location'},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    participant: { type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, required: true}


}, { timestamps: true })

module.exports =mongoose.model('Event', eventSchema)