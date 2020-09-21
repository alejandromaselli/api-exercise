const express = require('express');
const router = express.Router();
const User = require('../database/models/acronym')

function randomize(array, value, i){
    if (array.length != i) {
        if(array.includes(value) || array.includes(value + 1) || array.includes(value - 1))
            randomize(array, Math.round(Math.random() * 100), i)
        else
            array.push(value)
            randomize(array, Math.round(Math.random() * 100), i)
    } 
    return array
}
router.get('/random/:count', (req, res) => {
    const records = randomize([], Math.round(Math.random() * 100), req.params.count)
    console.log(records);
    var acronyms = {}
    records.map(record => {
        User.find({
            relationalID: record
        }, (err, obj) => {
           acronyms.push(obj)
           console.log(obj);
        })
    })
    console.log(acronyms);
    res.send(acronyms);
});

module.exports = router;

// 2,6,3