import React from 'react';
import './style.css'
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Flights from './Flights'
import TabsControlled from './TabsControlled';




  
const App = () => (
  <Router>
    <div>
  
    <Route exact path="/" component={TabsControlled} />
      <Route path="/flight-search" component={Flights}/>
    </div>
  </Router>


    );


export default App;
