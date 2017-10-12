
import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Pagination from 'react-js-pagination';
require("bootstrap/less/bootstrap.less");


class Flights extends Component {

  constructor(props) {
    super(props);
    this.Hotel = this.props.Hotel;
    this.state = {
        Hotels_data : [],
        activePage: 1,
        itemsCountPerPage : 40
    };
}

componentDidMount() {
    axios.get("http://localhost:5000/flight/hotels")
    .then( (response) => {
     this.setState({ Hotels_data : response.data })
})
}

handlePageChange = (pageNumber) =>  {

this.setState({activePage: pageNumber});
}


render() {
     // Logic for displaying current hotels
     const indexOfLastHotel = this.state.activePage * this.state.itemsCountPerPage;
     const indexOfFirstHotel = indexOfLastHotel - this.state.itemsCountPerPage;
     const currentHotels = this.state.Hotels_data.slice(indexOfFirstHotel, indexOfLastHotel);

    return (<div>

    <Pagination
      activePage={this.state.activePage}
      itemsCountPerPage={this.state.itemsCountPerPage}
      totalItemsCount={this.state.Hotels_data.length}
      pageRangeDisplayed={5}
      onChange={this.handlePageChange}
    />

    { currentHotels.map(data => {
    return (
<div className="container">
<div className="row">
 <div className="col-md-12">
     <div className="col-sm-6 col-md-6">
         <div className="thumbnail" >
             <img src={data.image.map( img => {return img.url})} className="img-responsive" alt="ahsan ki iamge" />
             
             <div className="caption">
             <Rater total={5} rating={data.rating.map(rating => {return rating.value})} interactive={false} />
                 <div className="row">
                     <div className="col-md-6 col-xs-6">
                         <h3>{data.summary.hotelName}</h3>
                     </div>
                     <div className="col-md-6 col-xs-6 price">
                     
                     </div>
                 </div>
                 <p>{data.location.address}</p>
                 <div className="row">
                     <div className="col-md-6">
                             <h3> <label>{Math.floor(data.summary.lowRate)}</label> SAR</h3>
                     </div>
                     <div className="col-md-12">
                         <a className="btn btn-warning btn-product"> Select</a></div>
                 </div>

                 <p> </p>
             </div>
         </div>
     </div>
     
 </div> 

</div>
</div>)
 })}
  
    </div>
    )
}
}

export default Flights;