var express = require('express');
var router = express.Router();
var flight = require('./controller');
var mongoose = require('mongoose');
var Flight = mongoose.model('Flights');
  



router.get('/flight-search/:flight', flight.search);
router.get('/hotels', flight.hotels);
router.get('/hotels/resources', flight.resources);


module.exports = router;

