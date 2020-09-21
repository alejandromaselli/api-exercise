const express = require('express');
const router = express.Router();
const Acronym = require('../database/models/acronym');


router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

router.get('/:acronym', (req, res) => {
    //res.send(req.params.acronym);
    console.log(req.params.acronym + ' acronym'); 
    Acronym.find({
        acronym: req.params.acronym
    }, (err, obj) => {
        if(err == null && obj.length != 0){
            res.send(obj);
            console.log(obj);
        }else
            res.send("Error")
    })  

});

router.get('/acronym',(req, res) => {
    console.log(req.body);
})

router.get('/posts', (req, res) => {
    res.send('We are on posts');
});

module.exports = router;
