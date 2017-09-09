import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */

 let date = new Date().toDateString()
const DatePickerUI = () => (

  <div>
    <DatePicker hintText={date} container="dialog" />
    <DatePicker hintText="Add a return" container="dialog" />

  </div>
);

export default DatePickerUI;