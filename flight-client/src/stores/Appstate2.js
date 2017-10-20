import { observable, action, computed} from 'mobx';
import axios from 'axios'



class  Flights {

    @observable filteredData = []
     @observable SearchInput = ''

    @computed get SearchFilter (){
        let datas
       
        return this.filteredData.filter((data) => {
            return datas = data.summary.hotelName.toLowerCase().indexOf(this.SearchInput.toLowerCase()) !== -1;

           
    }) 
            return this.filteredData = datas
          
    }


}

 const store = new Flights();

export default store;