import React, {Component} from 'react';
import { AutoComplete}   from 'material-ui';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'



class MaterialUIAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource : [],
      inputValue : ''
    }
  }

  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }

  performSearch() {
    const
    self = this;

    let url = 'http://localhost:5000/flight/flight-search/' + this.state.inputValue;
    
    if(this.state.inputValue.length >= 2) {

    axios.get(url)
    .then(function (response) {
      let searchResults, retrievedSearchTerms;
      console.log(response);

      searchResults = response.data;
      
            // retrievedSearchTerms = searchResults.map(function(result) {
            //   return result;
            // });
      
            self.setState({
              dataSource: searchResults
            });
    })
    .catch(function (error) {
      console.log(error);
    });

    
   
  }
}
  

  render() {
    return  <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource    = {this.state.dataSource}
        onUpdateInput = {this.onUpdateInput} />
      </MuiThemeProvider> 
  }
}

export default MaterialUIAutocomplete;