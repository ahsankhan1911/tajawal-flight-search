import { observable, action, computed } from 'mobx';
import axios from 'axios'
import _ from 'lodash';
// import Multicity from './Multicity'


class FlightData {

    @observable value = 1;
    @observable adults = 1;
    @observable children = 0;
    @observable infants = 0;
    @observable flag1 = true;
    @observable flag2 = true;
    @observable flag3 = true;
    @observable flag4 = true;
    @observable flagAdd1 = false;
    @observable flightAdd = true;
    @observable count = 1;
    @observable count2;   
    @observable flagAdd2 = false;
    @observable inputvalue = '';
    @observable inputvalue2 = '';
    @observable dataSource = [];

    @observable dates = {to:'', from:''}

    @observable Flights =  [];





    @action AdultsIncrement() {
        if (this.adults === 9 || this.children + this.adults === 9) {

            this.adults + 1 - 1;
        }

        else {
            this.adults++;


        }

    }
    @action ChildIncrement() {
        if (this.children === 8 || this.children + this.adults === 9) {

            this.children + 1 - 1;
        }

        else {
            this.children++;
        }

    }

    @action InfantsIncrement() {
        if (this.infants === this.adults) {
            this.infants + 1 - 1
        }
        else {
            this.infants++;
        }

    }


    @action AdultsDecrement() {
        if (this.adults <= 1) {
            this.adults + 1 - 1
        }
        else {
            this.adults--;
            this.infants--;
        }

    }

    @action ChildDecrement() {

        if (this.children <= 0) {
            this.children + 1 - 1
        }
        else {
            this.children--;
        }

    }

    @action InfantsDecrement() {

        if (this.infants <= 0) {
            this.infants + 1 - 1
        }
        else {
            this.infants--;
        }

    }


    @action handleClear2() {


        this.flag1 = false;
        _.pull(this.flightArray, 2)

       _.map(this.flightArray, (value) =>  {
         this.flightArray2.push (value - 1); 

      
        } )

    //  this.flightArray3 =   _.sortedUniq(this.flightArray2);

    //     console.log(this.flightArray3);

    }

    @computed get total() {
        return this.adults + this.children + this.infants;
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
    console.log(this.inputvalue)
    console.log(this.inputvalue2)
}
}


const store = new FlightData();
export default store;