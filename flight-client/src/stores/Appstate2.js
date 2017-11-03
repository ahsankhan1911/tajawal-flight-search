import { observable, computed } from 'mobx';

import _ from 'lodash';



class Flights {

    @observable filteredData = [];
    @observable searchInput = ''
    @observable ratingInput = [];
    @observable districtInput = [];
    @observable chainInput = [];
    @observable PAInput = [];
    @observable RAInput = [];
    @observable PriceInput = [];
    @observable Sort = '';
    @observable SortDir = '';



    @computed get SearchFilter() {


        let SortedData = _.sortBy(this.filteredData, (a) => {

            switch (this.Sort) {
                case "priceID":
                    {
                        return a.summary.lowRate
                    }
                case "distID":
                    {
                        return a.summary.distance
                    }
                case "nameID":
                    {
                        return a.summary.hotelName

                    }
                case "ratingID":
                    {
                        return a.rating.map(d => {
                            return d.value
                        })
                    }
                default:
            }

        })

        if (this.SortDir === 'DESC') {
            _.reverse(SortedData)
        }

        return _.filter(SortedData, (data) => {


            return data.summary.hotelName.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1
                &&

                this.ratingInput.every((c) => {

                    return _.some((data.rating), d => {
                        console.log(c)
                        return d.value === c;
                    })
                }) 
                &&

                this.districtInput.every((c, i) => {
                    return data.meta.districtId !== c

                })
                &&

                this.chainInput.every((c, i) => {
                    return data.meta.chainId !== c

                })

                &&
                this.PAInput.every((c, i) => {

                    return _.some((data.meta.amenities.propertyAmenity), d => {

                        return d.code !== c;
                    })
                })
        })
    }


}


const store = new Flights();

export default store;