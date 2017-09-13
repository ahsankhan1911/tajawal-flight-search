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

       
  handleChange = (event, index, value) => this.setState({value});


  handleInc() {
    let {FlightData} = this.props;
    if(FlightData.adults <= 8) {FlightData.adults++;} FlightData.adults +1 -1
  
  }

  handleDec() {
    let {FlightData} = this.props;
    if(FlightData.adults >= 2) {FlightData.adults--;} FlightData.adults +1 -1
  
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
      <SelectField value={FlightData.value} onChange={this.handleChange}  floatingLabelText={FlightData.total + " Passengers"} floatingLabelStyle={selectStyle}>

        <table className="table1" cellPadding="15px">
          <tbody>
  <tr>
    <td>Adults(12+)</td>
    <td><input className="input1" type="button" value="-" onClick={e => this.handleDec()}/>  <span>{FlightData.adults}</span> <input className="input1" type="button"  value="+" onClick={e => this.handleInc()}/> </td> 
  </tr>
  <tr>
    <td>Children(2- 12)</td>
    <td><input className="input1" type="button" value="-" onClick={e =>FlightData.children--}/>  <span>{FlightData.children}</span> <input className="input1" type="button" value="+" onClick={e =>FlightData.children++}/></td> 

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