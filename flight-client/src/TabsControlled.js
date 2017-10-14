import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlightSearch from './FlightSearch';
import DatePicker2 from 'material-ui/DatePicker';
import { inject, observer } from 'mobx-react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { AutoComplete } from 'material-ui';
import axios from 'axios';
import _ from 'lodash';
import './style.css'


let flagC = true, flagAdd = true, AddContent;
let ContClear, ContClearFlag = true;

@inject('FlightData')
@observer class TabsControlled extends Component {
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

    FlightData.flight3 = 3
    flagC = true;
    ContClearFlag = true;


  }


  handleRoundtripActive() {
  

  }

  handleMulticityActive() {
    let { FlightData } = this.props
  
    if (flagC === true) {
      FlightData.request.flights.push(_.cloneDeep(FlightData.flight))
      FlightData.request.flights.push(_.cloneDeep(FlightData.flight))
      console.log(FlightData.request.flights)


    }

    flagC = false

  }

  handleAdd() {
    let { FlightData } = this.props

    if (FlightData.request.flights.length === 4) {
      flagAdd = false;
    }

    
    
      FlightData.request.flights.push(_.cloneDeep(FlightData.flight))
  
  }




  render() {
 
    let { FlightData } = this.props

    AddContent = flagAdd ? <div><p>Add upto 6 flights <ContentAdd onClick={() => this.handleAdd()} className="Close" /></p></div> : null




    return (
      <div>
        <h1>Tajawal Flight Search</h1>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="One-way" value="a" onActive={() => this.handleOneWayActive()}>
            <div>
              <FlightSearch /> 

            </div>
          </Tab>
          <Tab label="Round-trip" value="b"  onActive={() => this.handleRoundtripActive()}>
            <div>
              <FlightSearch />  <br />  
            </div>
          </Tab>
          <Tab label="Multi-city" value="c" onActive={() => this.handleMulticityActive()}>
            <div>
              <FlightSearch />
              {FlightData.request.flights.map((flight, index) => { return <Multicity key={index} flight={flight} serialNo={index} /> })}
              {AddContent}
              <br />
            </div>
          </Tab>
        </Tabs>
      </MuiThemeProvider>
      </div>
    );
  }
}






@inject('FlightData')
@observer class Multicity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource2: [],
      inputValue2: ''
    }
  }

  handleOriginChange(value) {


    this.props.flight.origin = value;
  }

  handleDestinationChange(value) {

    this.props.flight.destination = value

  }
  handleDateChange(none, date) {

    this.props.flight.date = date
  }

  performSearch() {
    let url = 'http://localhost:5000/flight/flight-search/' + this.state.inputValue2;
    let retrievedItem;

    if (this.state.inputValue2.length >= 2) {

      axios.get(url)
        .then((response) => {
          let searchResults;

          retrievedItem = response.data.map((d) => {

            searchResults = d.iata + ',' + d.name
            return searchResults;
          })

          this.setState({
            dataSource2: retrievedItem
          })

        })
        .catch((error) => {
          console.log(error);
        });



    }
  }

  handleClear() {
    
        let { FlightData } = this.props;
    
    
        _.pullAt(FlightData.request.flights, this.props.serialNo)
    
        switch (FlightData.request.flights.length) {
    
          case 3:
            ContClearFlag = false;
            ContClear =null;
          
          case 4: 
             flagAdd = true
            
          default:
            ContClearFlag = true;
        }
    
      }


  render() {
    let { FlightData } = this.props;
    ContClear = ContClearFlag ? <ContentClear onClick={() => this.handleClear()} className="Close" /> : null
    return (<div>


      <div><h4>Flight {this.props.serialNo + 2} {ContClear} </h4>  </div>

      <MuiThemeProvider muiTheme={getMuiTheme()}>

        <div>
          <AutoComplete
            dataSource={this.state.dataSource2}
            onUpdateInput={(val) => { this.handleOriginChange(val); console.log(FlightData.origin) }} filter={AutoComplete.caseInsensitiveFilter} hintText="Origin"

          /> </div>

      </MuiThemeProvider>
      <br />
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>  <AutoComplete
          dataSource={this.state.dataSource2}
          onUpdateInput={(val) => { this.handleDestinationChange(val); console.log(FlightData.destination) }} filter={AutoComplete.caseInsensitiveFilter} hintText="Destination"
        /> </div>

      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div> <DatePicker2 container="inline" hintText="Flight Date" mode="landscape" onChange={(none, date) => this.handleDateChange(none, date)} />
        </div>
      </MuiThemeProvider>
    </div>
    )
  }
}

export default TabsControlled;