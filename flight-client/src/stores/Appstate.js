import { observable, action, computed} from 'mobx';
import axios from 'axios'
import _ from 'lodash';
// import Multicity from './Multicity'


class  FlightData  {

    flight = {
        origin: '',
        destination: '',
        date: ''
    }

    @observable request = {
         origin: '',
         destination: '',
         dates: {to: '', from: ''},
         adults: 1,
         children: 0,
         infants: 0,
         flights: [
             
         ]
    }
    
   @observable value = 1;
   @observable flag1 = true;
   @observable flag2 = true;
   @observable flag3 = true;
   @observable flag4 = true;
   @observable flagAdd1 = false;
   @observable flightAdd = true;
   @observable count = 1;
   @observable count2;   
   @observable flagAdd2 = false;
   @observable dataSource = [];



    @action AdultsIncrement() {
        if (this.request.adults === 9 || this.request.children + this.request.adults === 9) {

            this.request.adults + 1 - 1;
        }

        else {
            this.request.adults++;


        }

    }
    @action ChildIncrement() {
        if (this.request.children === 8 || this.request.children + this.request.adults === 9) {

            this.request.children + 1 - 1;
        }

        else {
            this.request.children++;
        }

    }

    @action InfantsIncrement() {
        if (this.request.infants === this.request.adults) {
            this.request.infants + 1 - 1
        }
        else {
            this.request.infants++;
        }

    }


    @action AdultsDecrement() {
        if (this.request.adults <= 1) {
            this.request.adults + 1 - 1
        }
        else {
            this.request.adults--;
            this.request.infants--;
        }

    }

    @action ChildDecrement() {

        if (this.request.children <= 0) {
            this.request.children + 1 - 1
        }
        else {
            this.request.children--;
        }

    }

    @action InfantsDecrement() {

        if (this.request.infants <= 0) {
            this.request.infants + 1 - 1
        }
        else {
            this.request.infants--;
        }

    }


    @computed get total() {
        return this.request.adults + this.request.children + this.request.infants;
    }



@action onUpdateInput(data) {
        // if(this.count2 ===1) {
        //          this.inputvalue = data
        //       }
        // if(this.count2 === 2) {
        //     this.inputvalue2 =data
        // }

        this.inputvalue = data;

    let url = 'http://localhost:5000/flight/flight-search/' + this.inputvalue;    
     console.log(url)

    let retrievedItem;
   
    if (this.inputvalue.length >= 2) {

      axios.get(url)
        .then((response) => {
          let searchResults;
      
         retrievedItem =  response.data.map((d) => {
          
            searchResults = d.iata + ',' + d.name
            return searchResults;
          })
              this.dataSource = retrievedItem;

        })
        .catch((error) => {
          console.log(error);
        });
    }
   
}


 }

 
 const store = new FlightData();

export default store;