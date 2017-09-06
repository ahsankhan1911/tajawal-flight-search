var mongoose =require('mongoose');
var Flight = mongoose.model('Flights');



exports.search = (req ,res, next) => {

    Flight.find({name: req.params.id}, (err , flight) => {

        if(err) {
            next();
        }

        else {
            res.send(flight)
        }
    })
} 