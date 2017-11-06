const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const Flight = require( './flight/model');
var cors = require('cors');

mongoose.connect('mongodb://localhost/flightDB', {useMongoClient: true}, (err) => {
    if(err){
        console.log(err);
    }
    else {
        console.log("MongoDB is now Connected")
    }
});

app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/flight', require('./flight'));

app.listen(port,'192.168.10.5', () => {
    console.log(`Running server on ${port}`);
});


// // app.use(  (err, req,;res, next) y
// => {


// //     res.status(err.output.payload.statusCode).send(err.message);



// // });