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
          <MaterialUIAutocomplete/> <DatePicker/>  <SelectField/> <SearchButton/>
          
           
          </div>
        </Tab>
        <Tab label="Round-trip" value="b">
          <div>
            <h2 style={styles.headline}>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
        <Tab label="Multi-city" value="c">
          <div>
            <h2 style={styles.headline}>Controllable Tab C</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>
      </MuiThemeProvider>
    );
  }
}