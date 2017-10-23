import { observable, action, computed } from 'mobx';

import _ from 'lodash';



class Flights {

    @observable filteredData = []
    @observable searchInput = ''
    @observable ratingInput = []
    @observable districtInput = []
    @observable chainInput = []
    @observable PAInput = []
    @observable RAInput = []




    @computed get SearchFilter() {


        return _.filter(this.filteredData, (data) => {


            return data.summary.hotelName.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1 
               &&

                this.ratingInput.every((c, i) => {

                    return _.some((data.rating), d => {

                        return d.value !== c;
                    })
                }) &&

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