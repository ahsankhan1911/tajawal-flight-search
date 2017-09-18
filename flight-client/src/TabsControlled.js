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
  }

  render() {
    let {FlightData} = this.props
 
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="One-way" value="a" onActive={()=> this.handleOneWayActive()}>
          <div>
         <p> <MaterialUIAutocomplete /> <DatePicker/> <SelectField/> <SearchButton/></p>
          
           
          </div>
        </Tab>
        <Tab label="Round-trip" value="b">
          <div>
          <MaterialUIAutocomplete/> <DatePicker/> <br/>  <SelectField/> <SearchButton/>
          </div>
        </Tab>
        <Tab label="Multi-city" value="c">
          <div>
          <MaterialUIAutocomplete/> <DatePicker/> <br/>  <SelectField/> <SearchButton/> {FlightData.FlightAdd.map(d => { 
            
            <div>{d}</div>}) } 
          </div>
        </Tab>
      </Tabs>
      </MuiThemeProvider>
    );
  }
}


export default TabsControlled;