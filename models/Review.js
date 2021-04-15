const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: {type: String, required: true},
    rating: {type: Number, min: 1, max: 5},
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
