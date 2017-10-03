import React, { Component } from 'react';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { inject, observer } from 'mobx-react';


@inject('FlightData')
@observer
class DatePicker extends Component{
 
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: ''
    }
  }


  render() {
    let {FlightData} = this.props
    return ( 
      <DateRangePicker
      startDate={FlightData.request.dates.to}
      endDate={FlightData.request.dates.from} 
      onDatesChange={({ startDate, endDate }) =>{ FlightData.request.dates.to = startDate; FlightData.request.dates.from = endDate }
      
      }
      focusedInput={this.state.focusedInput}
      onFocusChange={focusedInput => this.setState({focusedInput})} 
    />
    
    )

  }
}

export default DatePicker;