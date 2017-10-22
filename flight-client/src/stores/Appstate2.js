import { observable, action, computed } from 'mobx';

import _ from 'lodash';



class Flights {

    @observable filteredData = []
    @observable SearchInput = ''
    @observable id = '';



    @computed get SearchFilter() {
        console.log(this.id)

        if(this.id === " ") {
           return this.filteredData
        }

            if(this.id === "searchInput"){
                console.log ("input hit")
                return this.filteredData = _.filter(this.filteredData, (data) => {
                    return data.summary.hotelName.toLowerCase().indexOf(this.SearchInput.toLowerCase()) !== -1;
                })
            }

            if( this.id === "starRating") {

                return this.filteredData = _.filter(this.filteredData, data => {
                    return _.some((data.rating), d => {

                        return d.value !== this.SearchInput;
                    })

                })
            }

        }

    }

const store = new Flights();

export default store;