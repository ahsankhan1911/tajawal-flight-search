
import React, { Component } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
require("bootstrap/less/bootstrap.less");


class Flights extends Component {

  state = {
    data: [],
    activePage: 1
  }

 

  componentDidMount() {
    axios.get('http://www.localhost:5000/flight/hotels').then((response) => {

      this.setState({ data: response.data })
    }).catch((error) => {
      console.log(error)
    })
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }


  render() {

    return (
    <div>
         <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.data.length}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange}
        /> 

        {
          this.state.data.map(d => {

            return (
              <div>
                <ul>
                  <li>{d.summary.hotelName}</li>
                </ul>
         <img src={d.image.map(img => {return img.url } )} height="200" width="100" alt="tajawal images"/>
              </div>
            )
          })
        }
       
          </div>

    )
  }

}

export default Flights;