import { observable, action, computed} from 'mobx';

import Multicity2 from '../Multicity2';
import Multicity3 from '../Multicity3';

class FlightData {

    @observable value = 1;
    @observable adults=1;
    @observable children = 0;
    @observable infants = 0;    
    @observable flag1 = true;
    @observable flag2 = true;
    @observable flag3 = true;
    @observable flag4 =true;
    @observable flagAdd1 = false;
    @observable flagAdd2 = false;
   @observable flightAdd = true;
   @observable count =1;
   @observable count2 =1    

    @action AdultsIncrement ()  {
        if(this.adults === 9 || this.children + this.adults === 9){
           
            this.adults+1-1;
        }

        else {
            this.adults++;

         
        }
           
    }
    @action ChildIncrement ()  {
        if(this.children ===8 || this.children + this.adults === 9){

            this.children+1-1;
        }

        else{
            this.children++;
        }

    }

    @action InfantsIncrement ()  {
        if(this.infants === this.adults) {
            this.infants+1-1
        }
        else {
            this.infants++;
        }
           
    }


    @action AdultsDecrement() {
        if(this.adults <= 1 ) {
            this.adults+1-1
        }
        else {
            this.adults--;
            this.infants--;
        }
        
            }

   @action ChildDecrement() {
                
    if(this.children <= 0 ) {
        this.children+1-1
    }
    else {
        this.children--;
    }
    
                    }

   @action InfantsDecrement() {
                        
    if(this.infants <= 0 ) {
        this.infants+1-1
    }
    else {
        this.infants--;
    }
    
                            }

    @computed get total () {
        return this.adults + this.children + this.infants;
    }
 }

 const store = new FlightData();
export default store;