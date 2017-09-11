import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialUIAutocomplete from './MaterialUIAutocomplete';
import DatePicker from './DatePicker'
import SelectField from './SelectField';
import SearchButton from './SearchButton'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class TabsControlled extends React.Component {

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

  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="One-way" value="a">
          <div>
          <MaterialUIAutocomplete/> <DatePicker/> <br/>  <SelectField/> <SearchButton/>
          
           
          </div>
        </Tab>
        <Tab label="Round-trip" value="b">
          <div>
          <MaterialUIAutocomplete/> <DatePicker/> <br/>  <SelectField/> <SearchButton/>
          </div>
        </Tab>
        <Tab label="Multi-city" value="c">
          <div>
          <MaterialUIAutocomplete/> <DatePicker/> <br/>  <SelectField/> <SearchButton/>
          </div>
        </Tab>
      </Tabs>
      </MuiThemeProvider>
    );
  }
}