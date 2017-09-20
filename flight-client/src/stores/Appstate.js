import { observable, action, computed } from 'mobx';

import Multicity2 from '../Multicity2';
import Multicity3 from '../Multicity3';

import _ from 'lodash';


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
    @observable flagAdd2 = false;
    @observable flightAdd = true;
    @observable count = 1;
    //    @observable flight2 =2;  
    //    @observable flight3 =3
    //    @observable flight4 =4;    
    //    @observable flight5 = 5;    

    @observable flightArray = [1,2, 3, 4, 5];
    @observable flightArray2 = [2,3];
    @observable flightArray3;


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
}

const store = new FlightData();
export default store;