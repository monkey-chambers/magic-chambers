//server.js

const express = require('express');
const app = express();
const card = require("./card.js");


// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/card", card);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});