import { observable, action } from 'mobx';

import _ from 'lodash';



class Flights {

    @observable filteredData = []
    @observable SearchInput = ''
    @observable id = '';



    @action SearchFilter() {

        switch (this.id) {

            case this.id === "searchID":
                return this.filteredData = _.filter(this.filteredData, (data) => {
                    return data.summary.hotelName.toLowerCase().indexOf(this.SearchInput.toLowerCase()) !== -1;
                })


            case this.id === "starRating":

                return this.filteredData = _.filter(this.filteredData, data => {
                    return _.some((data.rating), d => {

                        return d.value !== this.SearchInput;
                    })

                })

            default:
                return this.filteredData;

        }

    }
}

const store = new Flights();

export default store;