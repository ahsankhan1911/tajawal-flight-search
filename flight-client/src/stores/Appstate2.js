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
                case "price":
                    {
                        return a.summary.lowRate
                    }
                case "dist":
                    {
                        return a.summary.distance
                    }
                case "name":
                    {
                        return a.summary.hotelName

                    }
                case "rating":
                    {
                        return a.rating.map(d => {
                            return d.value
                        })
                    }
                default:
                    return a.summary.priority;
            }

        })

        if (this.SortDir === 'DESC') {
            _.reverse(SortedData)
        }

        return _.filter(SortedData, (data) => {


            return data.summary.hotelName.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1
                &&

                data.summary.lowRate >= this.PriceInput[0] && data.summary.lowRate <= this.PriceInput[1]

                &&
                this.ratingInput.some((c) => {

                    return data.rating.some(d => {
                        // eslint-disable-next-line
                        return d.value == c;
                    })

                })
                &&

                this.districtInput.some((c, i) => {
                    // eslint-disable-next-line
                    return data.meta.districtId == c || data.meta.districtId == null || data.meta.districtId == 0

                })
                &&

                this.chainInput.some((c, i) => {
                    // eslint-disable-next-line
                    return data.meta.chainId == c || data.meta.chainId == 0

                })

                &&
                this.PAInput.some((c, i) => {

                    return _.some((data.meta.amenities.propertyAmenity), d => {
                        // eslint-disable-next-line
                        return d.code == c;
                    })
                })

                &&
                this.RAInput.some((c) => {
                    return _.some((data.meta.amenities.roomAmenity), d => {
                        // eslint-disable-next-line
                        return d.code == c;
                    })
                })
        })
    }


}


const store = new Flights();

export default store;