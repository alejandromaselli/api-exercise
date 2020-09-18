const express = require('express');
const fetch = require('node-fetch');

const app = express()


//Rutas

app.get('/', (req, res) => {
    (async () => {
        const response = await fetch('https://gist.githubusercontent.com/lsamayoa/f888703d79b03796877150bcb74bee6a/raw/5535c6be23f936096dc4084ad04439b9de5fec3c/gistfile2.txt');
        const json = await response.json();
    
        console.log(json);
    })();
});


app.get('/posts', (req, res) => {
    res.send('We are on posts');
});

app.listen(3000, () => {
    console.log("Server running");
});