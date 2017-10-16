var mongoose =require('mongoose');
var Flight = mongoose.model('Flights');
var hotelData = require('../hotels.json')
var hotelresources = require('../resources.json')

exports.search = (req, res, next) => {
    
        let search = req.params.flight;

          

                Flight.find().or([{'name' : {$regex: search, $options: 'i'}}, {'iata': {$regex: search, $options: 'i'}}]).exec(function(err,data) {
                   if(data.length == 0) {
                    res.status(404).end();
                   }

                   else {
                       res.send(data)
                   }
                
            })
              
            
    
    
    };

    exports.hotels = (req, res) => {
     res.send(hotelData.hotel)

    }

    exports.resources = (req, res) => {
        res.send(hotelresources.filters)
   
       }