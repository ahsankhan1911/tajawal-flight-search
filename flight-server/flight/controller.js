var mongoose =require('mongoose');
var Flight = mongoose.model('Flights');


exports.search = (req, res, next) => {
    
        let search = req.params.flight;

          

                Flight.find().or([{'name' : {$regex: search, $options: 'i'}}, {'iata': {$regex: search, $options: 'i'}}]).exec(function(err,data) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        console.log("data hit")
                   res.send(data);
                }
            })
              
            
    
    
    };