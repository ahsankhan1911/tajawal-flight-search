import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialUIAutocomplete from './MaterialUIAutocomplete';
import DatePicker from './DatePicker'
import SelectField from './SelectField';
import SearchButton from './SearchButton'
import Multicity from './Multicity';
import AddMulticity from './AddMulticity';
import { inject, observer } from 'mobx-react';

let content;
@inject('FlightData')

@observer class TabsControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleOneWayActive() {
    let { FlightData } = this.props;
    FlightData.flag1 = true;
    FlightData.flag2 = true;
    FlightData.flight3 = 3


  }

  handleMulticityActive() {
    let { FlightData } = this.props

    FlightData.Flights.push(<Multicity />)
    FlightData.Flights.push(<Multicity />)

  }




  render() {
    let { FlightData } = this.props


    content = FlightData.Flights.map(c => { return c })



    let showAdd = FlightData.flightAdd ? <AddMulticity /> : null;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="One-way" value="a" onActive={() => this.handleOneWayActive()}>
            <div>
              <MaterialUIAutocomplete /> <DatePicker /> <SelectField /> <SearchButton />

            </div>
          </Tab>
          <Tab label="Round-trip" value="b">
            <div>
              <MaterialUIAutocomplete /> <DatePicker /> <br />  <SelectField /> <SearchButton />
            </div>
          </Tab>
          <Tab label="Multi-city" value="c" onActive={() => this.handleMulticityActive()}>
            <div>
              <MaterialUIAutocomplete /> <DatePicker /> <br />  <SelectField /> <SearchButton />
              {content}

              <br />{showAdd}
            </div>
          </Tab>
        </Tabs>
      </MuiThemeProvider>
    );
  }
}


export default TabsControlled;