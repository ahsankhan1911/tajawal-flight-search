
import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Pagination from 'react-js-pagination';
import { inject, observer } from 'mobx-react';
require("bootstrap/less/bootstrap.less");


let currentHotels; 
let indexOfLastHotel;
let indexOfFirstHotel

@inject('FlightData')
@observer class Flights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            itemsCountPerPage: 40,
            resources: []
        };
    }

   
    componentDidMount() {
        axios.get("http://localhost:5000/flight/hotels")
            .then((response) => {
                let { FlightData } = this.props

                 FlightData.HotelData = response.data

            }).catch((error) => {
                console.log(error)
            })

            axios.get("http://localhost:5000/flight/hotels/resources")
            .then((response) => {
                this.setState({resources: response.data.filters})
                console.log(this.state.resources)

            }).catch((error) => {
                console.log(error)
            })

    }

    

    handlePageChange = (pageNumber) => {

        this.setState({ activePage: pageNumber });


    }

    handleSearchClick(event) {
        let { FlightData } = this.props
       
        let regex = new RegExp(this.refs.searchInput.value, 'i')
        FlightData.HotelData.filter(data => { return regex.test(data.summary.hotelName) })
    

    }


    render() {
        let { FlightData } = this.props

         indexOfLastHotel = this.state.activePage * this.state.itemsCountPerPage;
         indexOfFirstHotel = indexOfLastHotel - this.state.itemsCountPerPage;

         
        //  currentHotels = FlightData.HotelData.slice(indexOfFirstHotel, indexOfLastHotel);
         
      

        return (<div>

            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={FlightData.HotelData.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
            />
            <form className="col-sm-3 col-md-3" role="search">
                <div className="form-group input-group">
                    <input type="text" className="form-control" placeholder="Search.." ref="searchInput"/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={(e) => { this.handleSearchClick(e) }}>
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            </form>
            <p> {FlightData.HotelData.length} properties found </p>
            {FlightData.HotelData.map(data => {
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-sm-6 col-md-6">
                                    <div className="thumbnail" >
                                        <img src={data.image.map(img => { return img.url })} className="img-responsive" alt="Tajawal images" />

                                        <div className="caption">
                                            <Rater total={5} rating={data.rating.map(rating => { return rating.value })} interactive={false} />
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