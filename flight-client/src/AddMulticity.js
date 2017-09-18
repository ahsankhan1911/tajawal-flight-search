import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { inject, observer } from 'mobx-react';
import Multicity3 from './Multicity3';
import Multicity4 from './Multicity4';

@inject('FlightData')


@observer class AddMulticity extends React.Component {


    handleAdd() {
    let {FlightData} = this.props;

        FlightData.flagAdd1 = true;
        FlightData.flagAdd2 = true;
    }

    render () {
        let {FlightData} = this.props
        let showMul = FlightData.flagAdd1? <Multicity3/>: null
        let showMul2 = FlightData.flagAdd2? <Multicity4/>: null
   return(
         <div> 
                {showMul}<br/>
                {showMul2}
          <p>Add upto 6 flights <ContentAdd onClick={() => this.handleAdd()} className="Close"/> </p>
        </div>
            )
    }

};

export default AddMulticity;