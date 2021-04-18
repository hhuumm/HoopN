const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number, min: 1, max: 5},
    content: {type: String}
}, {timestamps: true});

const courtSchema = new Schema({
    name: {type: String, required: true},
    courtType: {type: String, default: 'Basketball'}
}, {timestamps: true});

const locationSchema = new Schema({
    name: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    courts: [courtSchema], 
    reviews: [reviewSchema]
}, {timestamps: true})

module.exports = mongoose.model('Location', locationSchema);