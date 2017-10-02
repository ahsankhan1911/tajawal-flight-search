import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { inject, observer } from 'mobx-react';
import './style.css'


let selectStyle = {

  'font-size': '22px',
  color: 'black',
  'margin-top': '25px'
}
@inject('FlightData')
@observer class SelectFieldUI extends Component {


  handleChange = (event, index, value) => { this.setState({ value }); };


  handleIncAdults(e) {
    let { FlightData } = this.props;

    FlightData.AdultsIncrement();

  }
  handleIncChildren(e) {

    let { FlightData } = this.props;

    FlightData.ChildIncrement();
  }

  handleIncInfants(e) {
    let { FlightData } = this.props;

    FlightData.InfantsIncrement();
  }


  handleDecAdults(event, index, value) {

    let { FlightData } = this.props;

    FlightData.AdultsDecrement()


  }
  handleDecChildren(event, index, value) {

    let { FlightData } = this.props;


    FlightData.ChildDecrement()


  }


  handleDecInfants(event, index, value) {

    let { FlightData } = this.props;


    FlightData.InfantsDecrement()

  }



  render() {
    let { FlightData } = this.props;
    return (
      <div>
        <SelectField value={FlightData.value} onChange={this.handleChange}>
          <MenuItem value={1} label="Economy" primaryText="Economy" />
          <MenuItem value={2} label="Premium Economy" primaryText="Premium Economy" />
          <MenuItem value={3} label="Business" primaryText="Business" />
          <MenuItem value={4} label="First" primaryText="First" />
        </SelectField><br />
        <SelectField value={FlightData.value} floatingLabelText={FlightData.total + " Passengers"} floatingLabelStyle={selectStyle}>

          <table className="table1" cellPadding="15px">
            <tbody>
              <tr>
                <td>Adults(12+)</td>
                <td><input className="input1" type="button" value="-" onClick={() => this.handleDecAdults()} />  <span>{FlightData.adults}</span> <input className="input1" value="+" type="button" onClick={() => this.handleIncAdults()}/> </td>
              </tr>
              <tr>
                <td>Children(2- 12)</td>
                <td><input className="input1" type="button" value="-" onClick={() => this.handleDecChildren()} />  <span>{FlightData.children}</span> <input className="input1" type="button" value="+" onClick={() => this.handleIncChildren()} /></td>

              </tr>
              <tr>
                <td>Infant(0-2)</td>
                <td><input className="input1" type="button" value="-" onClick={() => this.handleDecInfants()} />  <span>{FlightData.infants}</span> <input className="input1" type="button" value="+" onClick={() => this.handleIncInfants()} /></td>
              </tr>
            </tbody>
          </table>
        </SelectField>
      </div>
    );
  }
}


export default SelectFieldUI