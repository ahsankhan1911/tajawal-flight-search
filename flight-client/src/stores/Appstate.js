import { observable, action, computed} from 'mobx';

class FlightData {

    @observable value = 1;

    @observable adults = 1;
    @observable children = 0;
    @observable infants = 0;
    @observable totalPassengers =0;

    @action Increment (val)  {
          
        val++;
        console.log(val + " hellloo")
    }

    @action Decrement(val) {
        
        val--;
            }


    @computed get total () {
        return this.adults + this.children + this.infants;
    }
 }

 const store = new FlightData();
export default store;