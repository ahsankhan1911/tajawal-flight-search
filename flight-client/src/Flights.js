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
            filterStar : [],
            filterDist : [],
            filterChain : [],
            filterPA: [],
            filterRA : [],
            filteredData: [],
            input : ''
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

                this.setState({
                    resources: response.data,
                    filterStar : response.data[3].value,
                    filterDist : response.data[1].value,
                    filterChain : response.data[0].value,
                    filterPA : response.data[6].value,
                    filterRA : response.data[5].value
                })

            }).catch((error) => {
                console.log(error)
            })

        this.state.filteredData = _.clone(this.state.hotel_data)
    }

    handlePageChange = (pageNumber) => {

        this.setState({ activePage: pageNumber });

    }

    handleSearchClick(input) {

    

        
        this.setState({
            input : input,
            filteredData : _.filter(this.state.hotel_data, (data) => {
                return data.summary.hotelName.toLowerCase().indexOf(this.state.input.toLowerCase()) !== -1;

        })
        })
        console.log(this.state.filteredData)
    //  this.Flights.SearchInput =  this.refs.searchInput.value
    //  this.Flights.id = this.refs.searchBtn.id;

     

    }

    // District handel event
    handleDistCheck(code,key){
        console.log(code)
        
        var a =   this.state.filterDist
        a[key].selected = !a[key].selected

        this.setState({
            filterDist : a
        })

        if (this.state.filterDist[key].selected === false) {

            this.setState({
                filteredData: _.filter(this.state.hotel_data, data => {
                    return data.meta.districtId !== code

                })

            })

        }
         
    }

    // Chain handel event
    handleChainCheck(code,key){
        var a =   this.state.filterChain
        a[key].selected = !a[key].selected

        this.setState({
            filterChain : a
        })
         
    } 

    // Prop Amnities handel event
    handlePACheck(code,key){
        var a =   this.state.filterPA
        a[key].selected = !a[key].selected

        this.setState({
            filterPA : a
        })
         
    }

    // Room Amnities handel event
    handleRACheck(code,key){
        var a =   this.state.filterRA
        a[key].selected = !a[key].selected

        this.setState({
            filterRA : a
        })
         
    }
   
    // starRating handel event
    handleStarCheck(code,key) {
        console.log (code)

        var a =   this.state.filterStar
        a[key].selected = !a[key].selected

        this.setState({
            filterStar : a
        })
        console.log(this.state.filterStar[key].selected)

        if(this.state.filterStar[key].selected ===  false){

            this.setState({
                filteredData : _.filter(this.state.hotel_data , data => {
                    return _.some((data.rating), d => {
                        return d.value !== code;
                    })
        
                })
    
            })

        }
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

        indexOfLastHotel = this.state.activePage * this.state.itemsCountPerPage;
        indexOfFirstHotel = indexOfLastHotel - this.state.itemsCountPerPage;

        currentHotels =   _.slice(this.state.filteredData, indexOfFirstHotel, indexOfLastHotel);

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
                                        <button className="btn btn-primary" type="button" onClick={() => { this.handleSearchClick(this.refs.searchInput.value) }} ref="searchBtn" id="searchID">
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
                                              
                                            {this.state.filterStar.map((v, key) => {
                                               

                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" checked={v.selected} ref ="starR"
                                                            onClick={() => this.handleStarCheck(v.code,key)} id="starRating" />

                                                        </label>
                                                        <label>
                                                            <Rater total={5} rating={v.code} interactive={false} />

                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                
                            </div>

                            <hr />
                            <div>
                                <h4>District <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.dist.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="District" ref="dist">

                                            {this.state.filterDist.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" checked={v.selected} 
                                                            onClick={() => this.handleDistCheck(v.code,key)}/>

                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>

                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        
                            </div>
                            <hr />
                            <div>
                                <h4>Chain <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.chain.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="Chain" ref="chain">

            
                                            {this.state.filterChain.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                        <input type="checkbox" checked={v.selected}
                                                            onClick={() => this.handleChainCheck(v.code,key)} /> 
                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>
                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        
                            </div>
                            <hr />
                            <div>
                                <h4>Property Amenities <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.pa.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="PropertyAmenities" ref="pa">

                                

                                            {this.state.filterPA.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" value="asdasd" checked={v.selected}
                                                            onClick={() => this.handlePACheck(v.code,key)} />
                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>
                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                       
                            </div>
                            <hr />
                            <div>
                                <h4>Room Amenities <span><button className="btn btn-default" onClick={() => this.handleDivHide(this.refs.ra.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="RoomAmenities" ref="ra">

                                

                                            {this.state.filterRA.map((v, key) => {
                                                return (
                                                    <div key={key}>
                                                        <label>
                                                            <input type="checkbox" value="asdasd" checked={v.selected} 
                                                            onClick={() => this.handleRACheck(v.code,key)}/>
                                                        </label>
                                                        <label>
                                                            <p>{v.label}</p>
                                                        </label>
                                                        <a> only </a>
                                                    </div>)
                                            })}
                                        
                            </div>
                        </div>
                        <span className="properties"> {this.state.filteredData.length} properties found </span>
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
                    totalItemsCount={ this.state.filteredData.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}

// https://github.com/airbnb/rheostat

export default Flights;