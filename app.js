const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')
const bodyParser = require('body-parser')


const Acronym = require('./database/models/acronym');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//deletion
const conn = mongoose.createConnection('mongodb://localhost/acronyms');
conn.dropDatabase();

//Connection

const connection = mongoose.connect(
    //'mongodb://root:root@cluster0-shard-00-00.s1ldu.mongodb.net:27017,cluster0-shard-00-01.s1ldu.mongodb.net:27017,cluster0-shard-00-02.s1ldu.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-umyyzv-shard-0&authSource=admin&retryWrites=true&w=majority',
    'mongodb://localhost/acronyms',
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, obj) => {
        if(err == null){
            (async () => {
                const response = await fetch('https://gist.githubusercontent.com/lsamayoa/f888703d79b03796877150bcb74bee6a/raw/5535c6be23f936096dc4084ad04439b9de5fec3c/gistfile2.txt');
                const json = await response.json();
                
                json.map(object => {
                    
                    Acronym.create({
                        acronym: Object.keys(object)[0],
                        meaning: Object.values(object)[0]
                    }, (err, obj) => {
                            if(err == null){
                                //console.log("Inserción exitosa")
                            }
                            //return;
                   })
                })
            })();
            console.log("conetsion exitosa");
        } else
            console.log(err);
    });

//Rutas

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/acronym/:acronym', (req, res) => {
    //res.send(req.params.acronym);
    console.log(req.params.acronym + ' acronym'); 
    Acronym.find({
        acronym: req.params.acronym
    }, (err, obj) => {
        if(err == null && obj.length != 0)
            res.send(obj)
        else
            res.send("Error")
    })  

});

app.get('/acronym',(req, res) => {
    console.log(req.body);
})

app.get('/posts', (req, res) => {
    res.send('We are on posts');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});