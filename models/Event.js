const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    reviewer: { type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number, min: 1, max: 5},
    content: {type: String}
    
}, {timestamps: true});

const eventSchema = new Schema ({

    title: { type: String, required: true },
    placeId: { type: String, required: true },
    locName: { type: String },
    address: { type: String },
    court: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
    participant: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    date: {type: String, format: Date, required: true},
    time: {type: String, format: Date, required: true},
    

}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)