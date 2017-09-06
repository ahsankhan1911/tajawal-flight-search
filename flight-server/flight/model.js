'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FlightSchema = new Schema(
    {
        id_airport: { type: Number },
        iata: { type: String },
        name: { type: String },
        continent_code: { type: String },
        continent_name: { type: String },
        region_name: { type: String },
        priority: { type: Number },
        main_city_code: { type: String },
        main_city_name: { type: String }
    }
);

module.exports = mongoose.model('Flights', FlightSchema);