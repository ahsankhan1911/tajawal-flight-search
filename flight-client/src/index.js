import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './style.css'
import AppState from './stores/Appstate'
import AppState2 from './stores/Appstate2'
import {Provider} from 'mobx-react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
    <Provider  Flights={AppState2} FlightData={AppState}>
       <App/>
       </Provider>
      ,
     document.getElementById('root')
   );
   
