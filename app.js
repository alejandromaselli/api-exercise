const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const Acronym = require('./database/models/acronym');
const acronymRouter = require('./routes/acronym');
const homeRouter = require('./routes/home');

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//deletion
const conn = mongoose.createConnection(
    //'mongodb://root:root@cluster0-shard-00-00.s1ldu.mongodb.net:27017,cluster0-shard-00-01.s1ldu.mongodb.net:27017,cluster0-shard-00-02.s1ldu.mongodb.net:27017/acronyms?ssl=true&replicaSet=atlas-umyyzv-shard-0&authSource=admin&retryWrites=true&w=majority'
    'mongodb://localhost/acronyms'
    );
conn.dropDatabase();

//Connection
const connection = mongoose.connect(
    //'mongodb://root:root@cluster0-shard-00-00.s1ldu.mongodb.net:27017,cluster0-shard-00-01.s1ldu.mongodb.net:27017,cluster0-shard-00-02.s1ldu.mongodb.net:27017/acronyms?ssl=true&replicaSet=atlas-umyyzv-shard-0&authSource=admin&retryWrites=true&w=majority',
    'mongodb://localhost/acronyms',
    { useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, obj) => {
        if(err == null){
            (async () => {
                const response = await fetch('https://gist.githubusercontent.com/lsamayoa/f888703d79b03796877150bcb74bee6a/raw/5535c6be23f936096dc4084ad04439b9de5fec3c/gistfile2.txt');
                const json = await response.json();
                
                await json.map((object ,index) => {
                    
                    Acronym.create({
                        relationalID: index,
                        acronym: Object.keys(object)[0],
                        meaning: Object.values(object)[0]
                    }, (err, obj) => {
                            if(err != null){
                                console.log(err);
                            } else {
                                //console.log(obj);
                            }
                            //return;
                   })
                }, (err, obj) => {
                    console.log(err);
                })
            })();
            console.log("conetsion exitosa");
        } else
            console.log(err);
    });

//Rutas
app.use('/acronym', acronymRouter);
app.use('/', homeRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});