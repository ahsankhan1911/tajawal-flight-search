import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialUIAutocomplete from './MaterialUIAutocomplete';
import DatePicker from './DatePicker'
import SelectField from './SelectField';
import SearchButton from './SearchButton'
import Multicity from './Multicity';
import { inject, observer } from 'mobx-react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import _ from 'lodash';


let flagC = true, MulContent;
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
    let { FlightData } = this.props;
    FlightData.flag1 = true;
    FlightData.flag2 = true;
    FlightData.flight3 = 3


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
 
    FlightData.request.flights.push(_.cloneDeep(FlightData.flight))
    console.log(FlightData.request.flights)

  }

 


  render() {
    let { FlightData } = this.props
       
    MulContent = FlightData.request.flights.map( flight => { return <Multicity flight={flight}/>})

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="One-way" value="a" onActive={() => this.handleOneWayActive()}>
            <div>
              <MaterialUIAutocomplete /> <DatePicker /> <SelectField /> <SearchButton />

            </div>
          </Tab>
          <Tab label="Round-trip" value="b">
            <div>
              <MaterialUIAutocomplete /> <DatePicker /> <br />  <SelectField /> <SearchButton />
            </div>
          </Tab>
          <Tab label="Multi-city" value="c" onActive={() => this.handleMulticityActive()}>
            <div>
              <MaterialUIAutocomplete /> <DatePicker /> <br />  <SelectField /> <SearchButton />
              {MulContent}
              <br /> <div>
                <p>Add upto 6 flights <ContentAdd onClick={() => this.handleAdd()} className="Close" /> </p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </MuiThemeProvider>
    );
  }
}

export default TabsControlled;