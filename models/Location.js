const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number, min: 1, max: 5},
    content: {type: String}
}, {
    timestamps: true
});

const locationScema = new Schema({
    name: { 
        type: String, required: true
    },
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    court: {type: String, required: true}, 
    reviews: [reviewSchema]
})

module.exports = mongoose.model('Loaction', locationScema);