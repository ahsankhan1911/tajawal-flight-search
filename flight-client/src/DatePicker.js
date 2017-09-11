import React, { Component } from 'react';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      focusedInput: ''
    }
  }



  render() {

    return ( 
      <DateRangePicker
      startDate={this.state.startDate}
      endDate={this.state.endDate} 
      onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
      focusedInput={this.state.focusedInput}
      onFocusChange={focusedInput => this.setState({ focusedInput })} 
    />
    )
  }
}

export default DatePicker;