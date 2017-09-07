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

app.use(cors())

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/flight', require('./flight'));

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }


// app.use(allowCrossDomain)

app.listen(port, () => {
    console.log(`Running server on ${port}`);
});


// app.use(  (err, req,;res, next) => {


//     res.status(err.output.payload.statusCode).send(err.message);



// });