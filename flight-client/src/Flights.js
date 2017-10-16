
import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Pagination from 'react-js-pagination';
import './style.css'
import _ from 'lodash';
import { inject, observer } from 'mobx-react';
require("bootstrap/less/bootstrap.less");


let currentHotels;
let indexOfLastHotel;
let indexOfFirstHotel


 class Flights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            itemsCountPerPage: 40,
            resources: [],
            hotel_data: [],
           
        };
    }


    componentDidMount() {
        axios.get("http://localhost:5000/flight/hotels")
            .then((response) => {
               
               this.setState({hotel_data: response.data})

            }).catch((error) => {
                console.log(error)
            })

        axios.get("http://localhost:5000/flight/hotels/resources")
            .then((response) => {
                this.setState({ resources: response.data })

            }).catch((error) => {
                console.log(error)
            })

    }



    handlePageChange = (pageNumber) => {

        this.setState({ activePage: pageNumber });


    }

    handleSearchClick(event) {
     

        let regex = new RegExp(this.refs.searchInput.value, 'i')
        this.state.hotel_data.filter(data => { return regex.test(data.summary.hotelName) })

     let hello = _.find(this.state.resources , d => {

        return d.type === "district";
     });

     console.log( hello.value[0])


    }


    render() {
        let filterVal = this.state.resources.map(d => {return d.value})
       

        indexOfLastHotel = this.state.activePage * this.state.itemsCountPerPage;
        indexOfFirstHotel = indexOfLastHotel - this.state.itemsCountPerPage;


        currentHotels = this.state.hotel_data.slice(indexOfFirstHotel, indexOfLastHotel);



        return (
            
        
        <div>
            <div className="container">
                <h3>Select Hotel</h3>

                <div className="row">

                    <div className="col-md-3">
                        <h4>Filter</h4>
                        <form className="col-sm-12 col-md-12" role="search">
                            <div className="form-group input-group">
                                <input type="text" className="form-control" placeholder="Search.." ref="searchInput" />
                                <span className="input-group-btn">
                                    <button className="btn btn-primary" type="button" onClick={(e) => { this.handleSearchClick(e) }}>
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </form>
                        {filterVal.map((d,key) => {
                
                                return (
                                
                                    <div key={key}>
                                        <div>
                                            <label>
                                                <input type="checkbox" value="asdasd" checked/>
                                            </label>

                                            <label>
                                                <p>{d.label}</p>
                                            </label>

                                        </div>
                                    </div>
                                             
                         );})}

                    </div>

                    <div className="col-md-9">
                        <p> {this.state.hotel_data.length} properties found </p>
                        {currentHotels.map((data , key) => {
                            return (


                                <div className="col-sm-6 col-md-6" key={key}>
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
                            )
                        })}
                    </div>
                </div>
            </div>
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.hotel_data.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
            />
        </div>
        )
    }
}

export default Flights;