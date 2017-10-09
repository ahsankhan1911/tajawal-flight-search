
import React, { Component } from 'react';
import axios from 'axios';


class Flights extends Component {

  state = {
    data: []
  }
  

            componentDidMount() {
              axios.get('http://localhost:5000/flight/hotels').then((response) => {

                   this.setState({data: response.data})
              }).catch((error) => {
                console.log(error)
              })
            }
      

    
      render() {
        
        return (
          <div>
      
          {
            this.state.data.map(d => {

              return (
                <div>
                  <ul>
                    <li>{d.summary.hotelName}</li>
                  </ul>
                </div>
              )
            })
          })}
          </div>
         
        )
      }
    
    }

export default Flights;