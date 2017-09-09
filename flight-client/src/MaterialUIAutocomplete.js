import React, { Component } from 'react';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
import style from './App.css'




class MaterialUIAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource: [],
      inputValue: ''
    }
  }

  onUpdateInput(inputValue) {
    
    this.setState({
      inputValue: inputValue,
    }, function () {
      this.performSearch();
    });
  }

  performSearch() {
    let url = 'http://localhost:5000/flight/flight-search/' + this.state.inputValue;
    let retrievedItem;
   
    if (this.state.inputValue.length >= 2) {

      axios.get(url)
        .then((response) => {
          let searchResults;
      
         retrievedItem =  response.data.map((d) => {
          
            searchResults = d.iata + ',' + d.name
            return searchResults;
          })

            this.setState({
              dataSource: retrievedItem
            })

        })
        .catch((error) => {
          console.log(error);
        });



    }
  }


  render() {

    return ( 
    <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource={this.state.dataSource}
        onUpdateInput={this.onUpdateInput} filter={AutoComplete.caseInsensitiveFilter}

        />
  
    </MuiThemeProvider>
    <br/>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource={this.state.dataSource}
        onUpdateInput={this.onUpdateInput} filter={AutoComplete.caseInsensitiveFilter }
        />
  
    </MuiThemeProvider>
    </div>
    )
  }
}

export default MaterialUIAutocomplete;