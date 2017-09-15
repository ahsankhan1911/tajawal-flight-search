import { observable, action, computed} from 'mobx';

class FlightData {

    @observable value = 1;

    @observable adults=1;
    @observable children = 0;
    @observable infants = 0;




    @action AdultsIncrement ()  {
        
           this.adults++;
    }
    @action ChildIncrement ()  {
        
           this.children++;
    }

    @action InfantsIncrement ()  {
        
           this.infants++;
    }


    @action AdultsDecrement() {
        
        this.adults--;
            }

   @action ChildDecrement(val) {
                
    this.children--;
                    }

   @action InfantsDecrement(val) {
                        
    this.infants--;
                            }

    @computed get total () {
        return this.adults + this.children + this.infants;
    }
 }

 const store = new FlightData();
export default store;