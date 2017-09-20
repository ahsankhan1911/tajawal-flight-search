import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialUIAutocomplete from './MaterialUIAutocomplete';
import DatePicker from './DatePicker'
import SelectField from './SelectField';
import SearchButton from './SearchButton'
import Multicity from './Multicity';
import Multicity2 from './Multicity2';
import AddMulticity from './AddMulticity';

import { inject, observer } from 'mobx-react';
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
    let {FlightData} = this.props;
    FlightData.flag1 = true;
    FlightData.flag2 = true;
    FlightData.flight3 =3

   
  }

  render() {  
    let {FlightData} = this.props
    let showMul1 = FlightData.flag1?<Multicity/>: null;
    let showMul2 = FlightData.flag2? <Multicity2/>: null;
    let showAdd = FlightData.flightAdd? <AddMulticity/> : null;
 
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="One-way" value="a" onActive={()=> this.handleOneWayActive()}>
          <div>
          <MaterialUIAutocomplete /> <DatePicker/> <SelectField/> <SearchButton/>
           
          </div>
        </Tab>
        <Tab label="Round-trip" value="b">
          <div>
          <MaterialUIAutocomplete/> <DatePicker/> <br/>  <SelectField/> <SearchButton/>
          </div>
        </Tab>
        <Tab label="Multi-city" value="c">
          <div>
          <MaterialUIAutocomplete/> <DatePicker/> <br/>  <SelectField/> <SearchButton/>{showMul1}<br/>{showMul2}<br/>{showAdd}
          </div>
        </Tab>
      </Tabs>
      </MuiThemeProvider>
    );
  }
}


export default TabsControlled;