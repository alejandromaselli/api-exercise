const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');

const Acronym = require('./database/models/acronym');

const app = express()


//Connection

mongoose.connect(
    'mongodb://root:root@cluster0-shard-00-00.s1ldu.mongodb.net:27017,cluster0-shard-00-01.s1ldu.mongodb.net:27017,cluster0-shard-00-02.s1ldu.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-umyyzv-shard-0&authSource=admin&retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, obj) => {
        console.log(err + ' error');
    });

//Rutas

app.get('/', (req, res) => {
    (async () => {
        const response = await fetch('https://gist.githubusercontent.com/lsamayoa/f888703d79b03796877150bcb74bee6a/raw/5535c6be23f936096dc4084ad04439b9de5fec3c/gistfile2.txt');
        const json = await response.json();

        var contador = 0;
        
        json.map(object => {
            contador++;
        })

        console.log(contador);
        json.map(object => {
            Acronym.create({
                acronym: Object.keys(object)[0],
                meaning: Object.values(object)[0]
            }, (err, obj) => {
                if(err === null){
                    //console.log("exito")
                }
                res.send("Welcome to my API exercise")
            })
        })
    })();
    
    
});

app.get('/acronym/:acronym', (req, res) => {
    Acronym.find({
        acronym: req.params.acronym
    }, (err, obj) => {
        if((obj.lenght == 0))
            res.send("Error, no existe")
        else {
            if(obj.length == 0)
                res.send("Error")
            else
                res.send(obj)
        }
    })
});

app.get('/acronym', (req, res) => {
    res.send(req.query.id);
    console.log(req.query.id);
});



app.get('/posts', (req, res) => {
    res.send('We are on posts');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});