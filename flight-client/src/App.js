import React, { Component } from 'react';
import axios from 'axios'



import TabsControlled from './TabsControlled';


class App extends Component {

  
  render() {
    return (
      <div className="App">
      <h1>Tajawal Flights Search</h1>
       <TabsControlled/>
      </div>
    );
  }
}

export default App;
