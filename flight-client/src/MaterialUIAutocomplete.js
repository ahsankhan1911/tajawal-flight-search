import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css'
import { inject, observer } from 'mobx-react';
import DatePicker2 from 'material-ui/DatePicker';
import ContentClear from 'material-ui/svg-icons/content/clear';



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

const Multicity = () =>  (

  <div>
  <h4>Flight {this.props.FlightData.flightArray2[0]}</h4>
<MuiThemeProvider muiTheme={getMuiTheme()}>
<div> <AutoComplete
  dataSource={this.props.FlightData.dataSource}
  onUpdateInput={this.onUpdateInput} filter={AutoComplete.caseInsensitiveFilter}  hintText="Origin"

  /> <ContentClear onClick={() => this.handleClear()} className="Close"/></div>

</MuiThemeProvider>
<br/>
<MuiThemeProvider muiTheme={getMuiTheme()}>
<AutoComplete
  dataSource={this.props.FlightData.dataSource}
  onUpdateInput={this.onUpdateInput} filter={AutoComplete.caseInsensitiveFilter }   hintText="Destination"
  /> 

</MuiThemeProvider>
<MuiThemeProvider muiTheme={getMuiTheme()}>
<DatePicker2 container="inline" hintText="Flight Date" mode="landscape"/>
</MuiThemeProvider>
</div>
) 
export default MaterialUIAutocomplete;