import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css'
import { inject, observer } from 'mobx-react';


@inject('FlightData')
@observer class MaterialUIAutocomplete extends Component {


  render() {

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

        </MuiThemeProvider>
      </div>
    )
  }
}

export default MaterialUIAutocomplete;