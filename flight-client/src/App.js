import React, { Component } from 'react';
import './style.css'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Flights from './Flights'
import TabsControlled from './TabsControlled';




  
class App extends Component {

  render() {
     return (
       <Router>
         <div>

           <Route exact path="/" component={TabsControlled} />
           <Route path="/flight-search" component={Flights} />
         </div>
       </Router>

     )
  }
 
}


export default App;
