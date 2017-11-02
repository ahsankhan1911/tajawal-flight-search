import React, { Component } from 'react';
import './style.css'
import {BrowserRouter, Route} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Flights from './Flights'
import TabsControlled from './TabsControlled';




  
class App extends Component {

  render() {
     return (
       <BrowserRouter>
         <div>

           <Route exact path="/" component={TabsControlled} />
           <Route path="/flight-search" component={Flights} />
         </div>
       </BrowserRouter>

     )
  }
 
}


export default App;
