import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { inject, observer } from 'mobx-react';
import './style.css'


let selectStyle = {

  'font-size':'22px',
  color: 'black',
  'margin-top':'25px'
}
@inject('FlightData')
@observer class SelectFieldUI extends Component {

       
  handleChange = (event, index, value) => {this.setState({value});  console.log(value)};


  handleIncAdults(e)  {
    let {FlightData} = this.props;

          FlightData.AdultsIncrement();

          console.log(FlightData.adults)
  }
  handleIncChildren(e)  {
   
    let {FlightData} = this.props;

      FlightData.ChildIncrement();
  }

  handleIncInfants(e)  {
    let {FlightData} = this.props;

          FlightData.InfantsIncrement();
  }


  handleDecAdults(event, index, value) {
   
    let {FlightData} = this.props;

    FlightData.AdultsDecrement()

 
  }
  handleDecChildren(event, index, value) {
    
     let {FlightData} = this.props;

     
     FlightData.ChildDecrement()
 
  
   }


   handleDecInfants(event, index, value) {
    
     let {FlightData} = this.props;
       

     FlightData.InfantsDecrement()
  
   }

  

  render(){
    let {FlightData} = this.props;
    return (
      <div>
      <SelectField value={FlightData.value} onChange={this.handleChange}>
        <MenuItem value={1} label="Economy" primaryText="Economy" />
        <MenuItem value={2} label="Premium Economy" primaryText="Premium Economy" />
        <MenuItem value={3} label="Business" primaryText="Business" />
        <MenuItem value={4} label="First" primaryText="First" />
      </SelectField><br/>
      <SelectField value={FlightData.value} floatingLabelText={FlightData.total + " Passengers"} floatingLabelStyle={selectStyle}>

        <table className="table1" cellPadding="15px">
          <tbody>
  <tr>
    <td>Adults(12+)</td>
    <td><button className="input1" type="button" value={FlightData.adults} onClick={() => this.handleDec()}>-</button>  <span>{FlightData.adults}</span> <button className="input1" type="button"  onClick={() => this.handleIncAdults()}>+</button> </td> 
  </tr>
  {/* {console.log(FlightData.adults + "from main")} */}
  <tr>
    <td>Children(2- 12)</td>
    <td><input className="input1" type="button" value="-" onClick={e =>FlightData.children--}/>  <span>{FlightData.children}</span> <input className="input1" type="button" value="+" onClick={() => this.handleIncChildren()}/></td> 

  </tr>
  <tr>
    <td>Infant(0-2)</td>
    <td><input className="input1" type="button" value="-"onClick={e =>FlightData.infants--}/>  <span>{FlightData.infants}</span> <input className="input1" type="button" value="+" onClick={e =>FlightData.infants++}/></td> 
  </tr>
  </tbody>
</table>
    </SelectField>
    </div>
    );
  }
}


export default SelectFieldUI