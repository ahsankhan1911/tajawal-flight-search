import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Pagination from 'react-js-pagination';
import './style.css'
import _ from 'lodash';
import Rheostat from 'rheostat';
import 'react-rangeslider/lib/index.css'
import { inject, observer } from 'mobx-react';

require("bootstrap/less/bootstrap.less");



let currentHotels, indexOfLastHotel, indexOfFirstHotel;
let filterDist, filterChain, filterPA, filterRA, filterStar;

@inject('Flights')
@observer class Flights extends Component {

    constructor(props) {
        super(props);
        this.Flights = this.props.Flights; 

        this.state = {
            activePage: 1,
            itemsCountPerPage: 40,
            resources: [],
            hotel_data: [],
            min: 1,
            max: 100,
            filterSearInp: '',
            

        };
    }


    async componentDidMount() {
        await axios.get("http://localhost:5000/flight/hotels")
            .then((response) => {

                this.setState({
                    hotel_data: response.data
                })

            }).catch((error) => {
                console.log(error)
            })

        axios.get("http://localhost:5000/flight/hotels/resources")
            .then((response) => {
                this.setState({ resources: response.data })

            }).catch((error) => {
                console.log(error)
            })

      
           this.Flights.filteredData = _.clone(this.state.hotel_data)
        
    }

    handlePageChange = (pageNumber) => {

        this.setState({ activePage: pageNumber });

    }

    handleSearchClick(event) {
     this.Flights.SearchInput =  this.refs.searchInput.value
     this.Flights.id = this.refs.searchBtn.id;

     this.Flights.SearchFilter();

    }
   

    handleStarCheck(code) {

        this.Flights.SearchInput = code;
     
       this.Flights.id = this.refs.starR.id;
  
       this.Flights.SearchFilter();
    
    }
    
    handleDivHide(e) {

        var x = document.getElementById(e) ;

        if (x.style.display === "none") {
            x.style.display = "block";

        } else {
            x.style.display = "none";
        }
    }

    handleDragStart() {
        this.setState({
            min: this.state.min + 1
        })
    }

    handleDragEnd() {
        this.setState({
            min: this.state.min + 1
        })
    }

    handleSliderDragMove() {
        this.setState({
            min: this.state.min + 1
        })
    }


    render() {


        filterDist = _.filter(this.state.resources, d => { return d.type === "district"; });
        filterChain = _.filter(this.state.resources, d => { return d.type === "chain"; });
        filterPA = _.filter(this.state.resources, d => { return d.type === "propertyAmenity"; });
        filterRA = _.filter(this.state.resources, d => { return d.type === "roomAmenity"; });
        filterStar = _.filter(this.state.resources, d => { return d.type === "starRating"; });

        indexOfLastHotel = this.state.activePage * this.state.itemsCountPerPage;
        indexOfFirstHotel = indexOfLastHotel - this.state.itemsCountPerPage;

        currentHotels =   _.slice(this.Flights.filteredData, indexOfFirstHotel, indexOfLastHotel);

        return (
            <div>

                <div className="container">
                    <h2>Select Hotel</h2>

                    <div className="row">

                        <div className="col-md-3">
                            <h3>Filter</h3>
                            <form className="col-sm-12 col-md-12" role="search">
                                <div className="form-group input-group"> 
                                    <input type="text" className="form-control" placeholder="Search hotel name..." ref="searchInput" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-primary" type="button" onClick={(e) => { this.handleSearchClick(e) }} ref="searchBtn" id="searchID">
                                            <span className="glyphicon glyphicon-search"></span>
                                        </button>
                                    </span>
                                </div>
                            </form>
                            <div>
                                <h4>Price <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.price.id)}>^</button></span></h4>
                            </div>
                            <div id="Price" ref="price">


                                <div>
                                    <Rheostat
                                        min={this.state.min}
                                        max={this.state.max}
                                        values={[1, 100]}
                                        onSliderDragStart={() => this.handleDragStart()}
                                        onSliderDragEnd={() => this.handleDragEnd()}
                                        onSliderDragMove={() => this.handleSliderDragMove()}
                                        snap

                                    />

                                    <span>{this.state.min}</span> <span>{this.state.max}</span>
                                </div>



                            </div>
                            <div>
                                <h4>Star Rating <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.star.id)}>^</button></span></h4>
                            </div>
                            <div id="StarRating" ref="star">

                                {filterStar.map((d) => {

                                    return (
                                        <div>

                                            {d.value.map((v, key) => {

                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" defaultChecked={v.selected} ref="starR"
                                                            onClick={() => this.handleStarCheck(v.code)}  id="starRating"/>

                                                        </label>
                                                        <label>
                                                            <Rater total={5} rating={v.code} interactive={false} />

                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        </div>

                                    );
                                })}
                            </div>

                            <hr />
                            <div>
                                <h4>District <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.dist.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="District" ref="dist">

                                {filterDist.map((d) => {

                                    return (
                                        <div>

                                            {d.value.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" value="asdasd" checked={v.selected} />

                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>

                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        </div>

                                    );
                                })}
                            </div>
                            <hr />
                            <div>
                                <h4>Chain <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.chain.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="Chain" ref="chain">

                                {filterChain.map((d) => {

                                    return (
                                        <div>

                                            {d.value.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" value="asdasd" checked={v.selected} />
                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>
                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        </div>

                                    );
                                })}
                            </div>
                            <hr />
                            <div>
                                <h4>Property Amenities <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.pa.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="PropertyAmenities" ref="pa">

                                {filterPA.map((d) => {

                                    return (
                                        <div>

                                            {d.value.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" value="asdasd" checked={v.selected} />
                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>
                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        </div>

                                    );
                                })}
                            </div>
                            <hr />
                            <div>
                                <h4>Room Amenities <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.ra.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="RoomAmenities" ref="ra">

                                {filterRA.map((d) => {

                                    return (
                                        <div>

                                            {d.value.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" value="asdasd" checked={v.selected} />
                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>
                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                        <span className="properties"> {this.Flights.filteredData.length} properties found </span>
                        <div className="col-md-9">
                     
                              

                            {currentHotels.map((data, key) => {
                                return (


                                    <div className="col-sm-6 col-md-6" key={key}>
                                        <div className="thumbnail" >
                                            <div className="img-div">
                                                <img src={data.image.map(img => { return img.url })} className="img-responsive" alt="Tajawal images" />
                                            </div>
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
                    totalItemsCount={ this.Flights.filteredData.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}

// https://github.com/airbnb/rheostat

export default Flights;