const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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