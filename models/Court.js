const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courtSchema = mongoose.Schema({
    name: {type: String, required: true}
})




module.exports = mongoose.model('Court', courtSchema)