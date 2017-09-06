var express = require('express');
var router = express.Router();
var flight = require('./controller');
var mongoose = require('mongoose');
var Flight = mongoose.model('Flights');



router.get('/flight-search/:id', flight.search);

module.exports = router;

