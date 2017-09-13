import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppState from './stores/Appstate'
import {Provider} from 'mobx-react'

render(
    <Provider  FlightData={AppState}>
       <App/>
       </Provider>
      ,
     document.getElementById('root')
   );
   
registerServiceWorker();
