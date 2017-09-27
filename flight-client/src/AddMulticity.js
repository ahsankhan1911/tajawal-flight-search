import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { inject, observer } from 'mobx-react';

@inject('FlightData')


@observer class AddMulticity extends React.Component {


    handleAdd() {
    let {FlightData} = this.props;
            if(FlightData.count === 1) {
                FlightData.flagAdd1 = true;
                 return FlightData.count++;
            }

            if(FlightData.count === 2) {
                
                FlightData.flagAdd2 = true;
              
            }

            if(FlightData.flight3 === 2) {

                FlightData.flight4 =3;
            }
        
    }

    render () {

   return(
         <div> 
          <p>Add upto 6 flights <ContentAdd onClick={() => this.handleAdd()} className="Close"/> </p>
        </div>
            )
    }

};

export default AddMulticity;