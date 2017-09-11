import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './style.css'


var devstyle ={
  display: 'inline'
}
export default class SelectFieldUI extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

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
        <table>
         <tbody> 
           <tr>
          <td> Adults(12+)  <div ><input className="input1" type="button" value="-"/>  <span>4</span> <input type="button" value="-"/></div></td>
          <td><p>Chuldren(2- 12)</p>     <input type="button" value="-"/>    <p></p> </td>
          <td> <p>Infant(0-2)</p></td>
          </tr>
        </tbody>
        </table>
    </SelectField>
    </div>
    );
  }
}