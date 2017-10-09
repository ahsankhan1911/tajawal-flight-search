import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './style.css'
import AppState from './stores/Appstate'
import {Provider} from 'mobx-react'

render(
    <Provider  FlightData={AppState}>
       <App/>
       </Provider>
      ,
     document.getElementById('root')
   );
   
