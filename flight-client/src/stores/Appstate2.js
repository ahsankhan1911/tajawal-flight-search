import { observable, action, computed } from 'mobx';

import _ from 'lodash';



class Flights {

    @observable filteredData = []
    @observable searchInput = ''
    @observable ratingInput = ''
    @observable districtInput = ''
  



    @computed get SearchFilter() {
    
        //    return this.filteredData
       

           

                return _.filter(this.filteredData, (data) => {
                    
                   
                       return  data.summary.hotelName.toLowerCase().indexOf(this.searchInput.toLowerCase()) !== -1  &&
                          _.some((data.rating), d => { return d.value !== this.ratingInput; })

               


                // return  _.filter(this.filteredData, data => {
                //     return 
                //     })

                // })
            

        })

    }
}
    

const store = new Flights();

export default store;