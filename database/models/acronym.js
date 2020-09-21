const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    relationalID:{
        type: Number,
        required: true
    },
    acronym: String,
    meaning: String
});

const acronym = mongoose.model('acronym', dataSchema);

module.exports = acronym;