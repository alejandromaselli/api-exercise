const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    acronym: String,
    meaning: String
});

const acronym = mongoose.model('acronym', dataSchema);

module.exports = acronym;