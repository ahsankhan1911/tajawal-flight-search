import React, { Component } from 'react';
import axios from 'axios'



import TabsControlled from './TabsControlled';


class App extends Component {

  buttonClick() {
    axios.get('https://stackoverflow.com/questions/1771786/question-mark-in-javascript')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   

  }
  render() {
    return (
      <div className="App">
      <h1>Tajawal Flights Search</h1>
       <TabsControlled/>

       <button onClick={() => this.buttonClick() }>Click</button>
      </div>
    );
  }
}

export default App;
