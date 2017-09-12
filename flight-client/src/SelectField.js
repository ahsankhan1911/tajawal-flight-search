import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { inject, observer } from 'mobx-react';
import './style.css'

@inject('FlightData')
@observer class SelectFieldUI extends Component {
//   constructor() {
//     super();

//     this.state = {
//         value:1,
//         adults: 0
//     };

//     this.handleInc = this.handleInc.bind(this);
//     this.handleDec = this.handleDec.bind(this);
// }
       t
  handleChange = (event, index, value) => this.setState({value});

  handleInc() {
     this.setState({
       adults: this.state.adults+1
     })

    }

    handleDec() {
      this.setState({
        adults: this.state.adults-1
      })
 
     }
    


  render() {
    return (
      <div>
      <SelectField value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} label="Economy" primaryText="Economy" />
        <MenuItem value={2} label="Premium Economy" primaryText="Premium Economy" />
        <MenuItem value={3} label="Business" primaryText="Business" />
        <MenuItem value={4} label="First" primaryText="First" />
      </SelectField><br/>
      <SelectField value={this.state.value} onChange={this.handleChange}>

        <table className="table1" cellPadding="15px">
          <tbody>
  <tr>
    <td>Adults(12+)</td>
    <td><input className="input1" type="button" value="-" onClick={this.handleDec}/>  <span>{this.state.adults}</span> <input className="input1" type="button" value="+" onClick={this.handleInc}/></td> 
  </tr>
  <tr>
    <td>Children(2- 12)</td>
    <td><input className="input1" type="button" value="-"/>  <span>4</span> <input className="input1" type="button" value="+"/></td> 

  </tr>
  <tr>
    <td>Infant(0-2)</td>
    <td><input className="input1" type="button" value="-"/>  <span>4</span> <input className="input1" type="button" value="+"/></td> 
  </tr>
  </tbody>
</table>
    </SelectField>
    </div>
    );
  }
}


export default SelectFieldUI