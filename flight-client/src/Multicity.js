

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import './App.css'
import { inject, observer } from 'mobx-react';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash'
 var flagAdd = require('./TabsControlled')


@inject('FlightData')

