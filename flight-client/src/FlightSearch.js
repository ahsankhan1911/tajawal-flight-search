import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Search from 'material-ui/svg-icons/action/search';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './style.css'
import { inject, observer } from 'mobx-react';
import {Link} from 'react-router-dom';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },

};
let selectStyle = {

  fontSize: '22px',
  color: 'black',
  marginTop: '25px'
}

let menuStyle = {
  marginTop: '60px'
}


@inject('FlightData')
@observer class FlightSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: ''
    }
  }

  render() {
    let { FlightData } = this.props
    return (
      <div>
      
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <AutoComplete
            dataSource={this.props.FlightData.dataSource}
            onUpdateInput={e => { this.props.FlightData.onUpdateInput(e); }}
            filter={AutoComplete.caseInsensitiveFilter} hintText="Origin"

          />

        </MuiThemeProvider>
        <br />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <AutoComplete
            dataSource={this.props.FlightData.dataSource}
            onUpdateInput={e => { this.props.FlightData.onUpdateInput(e); }}
            filter={AutoComplete.caseInsensitiveFilter} hintText="Destination"
          />

        </MuiThemeProvider><br />
        <DateRangePicker
          startDate={FlightData.request.dates.to}
          endDate={FlightData.request.dates.from}
          onDatesChange={({ startDate, endDate }) => { FlightData.request.dates.to = startDate; FlightData.request.dates.from = endDate }

          }
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })} 
        /> <SelectFieldUI />

        <Link to="/flight-search">   
         <RaisedButton
    label="Search Flights"
    labelPosition="after"
    primary
    icon={<Search />}
    style={styles.button} /> 
 
    </Link>

      </div>
    )
  }
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
        <SelectField value={FlightData.value} floatingLabelText={FlightData.total + " Passengers"} floatingLabelStyle={selectStyle} menuStyle={menuStyle}>

          <table className="table1" cellPadding="15px">
            <tbody>
              <tr>
                <td>Adults(12+)</td>
                <td><input className="input1" type="button" value="-" onClick={() => this.handleDecAdults()} />  <span>{FlightData.request.adults}</span> <input className="input1" value="+" type="button" onClick={() => this.handleIncAdults()} /> </td>
              </tr>
              <tr>
                <td>Children(2- 12)</td>
                <td><input className="input1" type="button" value="-" onClick={() => this.handleDecChildren()} />  <span>{FlightData.request.children}</span> <input className="input1" type="button" value="+" onClick={() => this.handleIncChildren()} /></td>

              </tr>
              <tr>
                <td>Infant(0-2)</td>
                <td><input className="input1" type="button" value="-" onClick={() => this.handleDecInfants()} />  <span>{FlightData.request.infants}</span> <input className="input1" type="button" value="+" onClick={() => this.handleIncInfants()} /></td>
              </tr>
            </tbody>
          </table>
        </SelectField>
      </div>
    );
  }
}

export default FlightSearch;