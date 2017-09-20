import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentClose from 'material-ui/svg-icons/content/clear';
import axios from 'axios'
import './App.css'
import { inject, observer } from 'mobx-react';

import DatePicker2 from 'material-ui/DatePicker';


@inject('FlightData')

@observer class Multicity4 extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource5: [],
      inputValue5: ''
    }
  }

  onUpdateInput(inputValue) {
    
    this.setState({
      inputValue5: inputValue,
    }, function () {
      this.performSearch();
    });
  }

  performSearch() {
    let url = 'http://localhost:5000/flight/flight-search/' + this.state.inputValue5;
    let retrievedItem;
   
    if (this.state.inputValue5.length >= 2) {

      axios.get(url)
        .then((response) => {
          let searchResults;
      
         retrievedItem =  response.data.map((d) => {
          
            searchResults = d.iata + ',' + d.name
            return searchResults;
          })

            this.setState({
              dataSource5: retrievedItem
            })

        })
        .catch((error) => {
          console.log(error);
        });



    }
  }
   handleClose() {
      let {FlightData} = this.props;

      FlightData.flagAdd2 = false;
      FlightData.flightArray.reduce((p, c) => {

        console.log(c)
      })
   }

  render() {
    let {FlightData} = this.props;
    return ( 
    <div>
        <h4>Flight {FlightData.flightArray2[4]}</h4>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
     <div> <AutoComplete
        dataSource={this.state.dataSource5}
        onUpdateInput={this.onUpdateInput} filter={AutoComplete.caseInsensitiveFilter}  hintText="Origin"

        /> <ContentClose onClick={() => this.handleClose()} className="Close"/></div>
  
    </MuiThemeProvider>
    <br/>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource={this.state.dataSource5}
        onUpdateInput={this.onUpdateInput} filter={AutoComplete.caseInsensitiveFilter }   hintText="Destination"
        /> 
  
    </MuiThemeProvider>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <DatePicker2 container="inline" hintText="Flight Date" mode="landscape"/>
  
    </MuiThemeProvider>
    </div>
    )
  }
}

export default Multicity4;