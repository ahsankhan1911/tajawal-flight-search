import React, { Component } from 'react';
import axios from 'axios';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Pagination from 'react-js-pagination';
import './style.css'
import _ from 'lodash';
import Rheostat from 'rheostat';
import { inject, observer } from 'mobx-react';
import $ from 'jquery';
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import queryString from 'query-string';

require("bootstrap/less/bootstrap.less");

let currentHotels, indexOfLastHotel, indexOfFirstHotel;
let resetButtonStr, resetButtonDist, resetButtonChain, resetButtonPA, resetButtonRA;
let resetButtonStrFlg = false, resetButtonDistFlg = false, resetButtonChainFlg = false, resetButtonPAFlg = false, resetButtonRAFlg = false;


let queries = {}

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
            min: 0,
            max: 0,
            filterStar: [],
            filterDist: [],
            filterChain: [],
            filterPA: [],
            filterRA: [],
            filterPrice: [],
            input: '',
            values: [],

        };
    }


    async componentDidMount() {
        await axios.get("http://localhost:5000/flight/hotels")
            .then((response) => {

                this.setState({
                    hotel_data: response.data
                })
                this.Flights.filteredData = _.clone(this.state.hotel_data)

            }).catch((error) => {
                console.log(error)
            })

        axios.get("http://localhost:5000/flight/hotels/resources")
            .then((response) => {

                this.setState({
                    resources: response.data,
                    filterStar: response.data[3].value,
                    filterDist: response.data[1].value,
                    filterChain: response.data[0].value,
                    filterPA: response.data[6].value,
                    filterRA: response.data[5].value,
                    filterPrice: response.data[2].value,
                    values: [response.data[2].value.from, response.data[2].value.to],
                    min: response.data[2].value.min,
                    max: response.data[2].value.max
                })

            }).catch((error) => {
                console.log(error)
            })


    }



    handlePageChange = (pageNumber) => {

        this.setState({ activePage: pageNumber });

        window.scrollTo(-4, -5);

    }


    // hotelName handel event
    handleSearchClick(input) {
        let query

        this.Flights.searchInput = this.refs.searchInput.value


        if (this.refs.searchInput.value.length === 0) {
            delete queries['h'];
            query = queryString.stringify(queries)
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }
        else {

            queries.h = this.refs.searchInput.value
            query = queryString.stringify(queries)
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }




    }


    // starRating handel event
    handleStarCheck(starObj, key) {

        let query;

        resetButtonStrFlg = true;

        var a = this.state.filterStar
        a[key].selected = !a[key].selected

        this.setState({
            filterStar: a
        })

        if (a[key].selected === false) {
            this.Flights.ratingInput.push(starObj.code);


        }
        else {
            _.remove(this.Flights.ratingInput, (f) => {
                return f === starObj.code;
            })


        }


        //condition for querystring
        // if (this.Flights.ratingInput.length === 0) {
        //     delete queries['s'];
        //     query = queryString.stringify(queries)
        //     this.props.history.push({
        //         pathname: '/flight-search',
        //         search: query
        //     })
        // }
      
         queries.s = _.map(this.state.filterStar, (d)=> {
                return d.code
            })
    
            query = queryString.stringify(queries)
        
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        

    }


    // District handel event
    handleDistCheck(code, key) {
        let query;


        resetButtonDistFlg = true;
        var a = this.state.filterDist
        a[key].selected = !a[key].selected



        this.setState({
            filterDist: a
        })

        if (this.state.filterDist[key].selected === false) {

            this.Flights.districtInput.push(code)
        }
        else {
            _.remove(this.Flights.districtInput, (f) => {
                return f === code;
            })

        }

        if (this.Flights.districtInput.length === 0) {
            delete queries['d'];
            query = queryString.stringify(queries)
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }
        else {

            queries.d = this.Flights.districtInput
            query = queryString.stringify(queries)
            this.props.history.push({
                pathname: '/flight-search',
                search: query
            })
        }


    }

    // Chain handel event
    handleChainCheck(code, key) {

        resetButtonChainFlg = true;

        var a = this.state.filterChain
        a[key].selected = !a[key].selected

        this.setState({
            filterChain: a
        })

        if (a[key].selected === false) {

            this.Flights.chainInput.push(code)
        }
        else {
            _.remove(this.Flights.chainInput, (f) => {
                return f === code;
            })

        }

    }

    // Prop Amnities handel event
    handlePACheck(code, key) {

        resetButtonPAFlg = true

        var a = this.state.filterPA
        a[key].selected = !a[key].selected

        this.setState({
            filterPA: a
        })


        if (a[key].selected === false) {

            this.Flights.PAInput.push(code)
        }
        else {
            _.remove(this.Flights.PAInput, (f) => {
                return f === code;
            })

        }


    }

    // Room Amnities handel event
    handleRACheck(code, key) {
        resetButtonRAFlg = true;

        var a = this.state.filterRA
        a[key].selected = !a[key].selected

        this.setState({
            filterRA: a
        })

    }



    handleDivHide(e) {

        var x = document.getElementById(e);

        if (x.style.display === "none") {
            x.style.display = "block";

        } else {
            x.style.display = "none";
        }
    }


    // Rheostate functionalities

    //Price ranger handler
    updatePriceRanger(sliderState) {

        _.remove(this.Flights.PriceInput)

        this.setState({
            values: sliderState.values,
        });

        _.forEach(sliderState.values, (d) => {
            this.Flights.PriceInput.push(d)
        })
    }
    // Rheostate ends




    handleOnly(value, filter, Input) {
        _.remove(Input)
        this.setState({
            filter: _.forEach(filter, d => {
                d.selected = false;
                if (d.code === value.code) {
                    d.selected = true
                }

                if (d.selected === false) {
                    Input.push(d.code);
                }
            })
        })
    }


    //filter Reset 
    handleReset(filterData, filterInput, btnRef) {
        this.setState({
            filter: _.forEach(filterData, d => {
                d.selected = true;
            })
        })
        _.remove(filterInput)


        console.log(btnRef)

        switch (btnRef) {
            case "starRating":
                resetButtonStrFlg = false;
                break;
            case "dist":
                resetButtonDistFlg = false;
                break;
            case "chain":
                resetButtonChainFlg = false;
                break;
            case "PA":
                resetButtonPAFlg = false;
                break;
            case "RA":
                resetButtonRAFlg = false;
                break;
            default:
                console.log("No refs")
        }


    }



    //Sorting Functionality
    OnSort(LI, Anchor, Span) {
        this.Flights.Sort = Anchor

        if (document.getElementById(Span).className === "" || document.getElementById(Span).className === "glyphicon glyphicon-arrow-down") {
            this.Flights.SortDir = null
            $(".nav li").removeClass("active");
            $(".nav li span").removeClass("glyphicon glyphicon-arrow-up");
            document.getElementById(Span).className = "glyphicon glyphicon-arrow-up";
            document.getElementById(LI).className = "active";
        }

        else {
            document.getElementById(Span).className = "glyphicon glyphicon-arrow-down";
            this.Flights.SortDir = 'DESC'
        }
    }
    // Sorting Ends



    render() {

        indexOfLastHotel = this.state.activePage * this.state.itemsCountPerPage;
        indexOfFirstHotel = indexOfLastHotel - this.state.itemsCountPerPage;

        currentHotels = _.slice(this.Flights.SearchFilter, indexOfFirstHotel, indexOfLastHotel);

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

                                <form className="form">
                                    <Rheostat
                                        min={this.state.min}
                                        max={this.state.max}
                                        onValuesUpdated={(sliderState) => this.updatePriceRanger(sliderState)}

                                        values={this.state.values}

                                    />

                                    <span>SAR {this.state.values[0]}</span> <span>SAR {this.state.values[1]}</span>
                                </form>



                            </div>
                            <div>
                                <h4>Star Rating <span>{resetButtonStr = resetButtonStrFlg ? <button ref="starR" name="starRating" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterStar, this.Flights.ratingInput, this.refs.starR.name)}>reset</button> : null}</span> <span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.star.id)}>^</button></span></h4>
                            </div>
                            <div id="StarRating" ref="star">

                                {this.state.filterStar.map((v, key) => {


                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" checked={v.selected} ref="starR"
                                                    onClick={() => this.handleStarCheck({ code: v.code, selected: v.selected }, key)} id="starRating" />

                                            </label>
                                            <label>
                                                <Rater total={5} rating={v.code} interactive={false} />

                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterStar, this.Flights.ratingInput) }}> only </a>
                                        </div>)
                                })}

                            </div>

                            <hr />
                            <div>
                                <h4>District <span>{resetButtonDist = resetButtonDistFlg ? <button ref="distRes" name="dist" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterDist, this.Flights.districtInput, this.refs.distRes.name)}>reset</button> : null}</span><span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.dist.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="District" ref="dist">

                                {this.state.filterDist.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" checked={v.selected}
                                                    onClick={() => this.handleDistCheck(v.code, key)} />

                                            </label>
                                            <label>
                                                <p>{v.label}</p>

                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterDist, this.Flights.districtInput) }}> only </a>
                                        </div>)
                                })}

                            </div>
                            <hr />
                            <div>
                                <h4>Chain     <span>{resetButtonChain = resetButtonChainFlg ? <button className="btn btn-primary" ref="chainRes" name="chain" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterChain, this.Flights.chainInput, this.refs.chainRes.name)}>reset</button> : null}</span> <span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.chain.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="Chain" ref="chain">


                                {this.state.filterChain.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" checked={v.selected}
                                                    onClick={() => this.handleChainCheck(v.code, key)} />
                                            </label>
                                            <label>
                                                <p>{v.label}</p>
                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterChain, this.Flights.chainInput) }}> only </a>
                                        </div>)
                                })}

                            </div>
                            <hr />
                            <div>
                                <h4>Property Amenities <span>{resetButtonPA = resetButtonPAFlg ? <button ref="PARes" name="PA" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterPA, this.Flights.PAInput, this.refs.PARes.name)}>reset</button> : null}</span><span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.pa.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="PropertyAmenities" ref="pa">



                                {this.state.filterPA.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" value="asdasd" checked={v.selected}
                                                    onClick={() => this.handlePACheck(v.code, key)} />
                                            </label>
                                            <label>
                                                <p>{v.label}</p>
                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterPA, this.Flights.PAInput) }}> only </a>
                                        </div>)
                                })}

                            </div>
                            <hr />
                            <div>
                                <h4>Room Amenities <span>{resetButtonRA = resetButtonRAFlg ? <button ref="RARes" name="RA" className="btn btn-primary" style={{ height: "20px", width: "40px", padding: "0px 0px" }}
                                    onClick={() => this.handleReset(this.state.filterRA, this.Flights.RAInput, this.refs.RARes.name)}>reset</button> : null}</span><span><button className="btn btn-default hide-btn" onClick={() => this.handleDivHide(this.refs.ra.id)}>^</button></span></h4>
                            </div>
                            <div className="filterStyles" id="RoomAmenities" ref="ra">



                                {this.state.filterRA.map((v, key) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <input type="checkbox" value="asdasd" checked={v.selected}
                                                    onClick={() => this.handleRACheck(v.code, key)} />
                                            </label>
                                            <label>
                                                <p>{v.label}</p>
                                            </label>
                                            <a onClick={() => { this.handleOnly(v, this.state.filterRA, this.Flights.RAInput) }}> only </a>
                                        </div>)
                                })}

                            </div>
                        </div>




                        <div className="col-md-9">
                            <ul className="nav nav-pills" ref="ul">
                                <li id="popularLi" ref="popularLiRef" className="active"><a onClick={() => this.OnSort(this.refs.popularLiRef.id, this.refs.popularAnchor.id, this.refs.popularArrowRef.id)} id="popularID" ref="popularAnchor" >Popular <span id="popularArrow" ref="popularArrowRef" className="glyphicon glyphicon-arrow-up" ></span></a></li>
                                <li id="priceLi" ref="priceLiRef"><a onClick={() => this.OnSort(this.refs.priceLiRef.id, this.refs.priceAnchor.id, this.refs.priceArrowRef.id)} id="priceID" ref="priceAnchor" >Price <span id="priceArrow" ref="priceArrowRef" ></span></a></li>
                                <li id="distLi" ref="distLiRef" ><a onClick={() => this.OnSort(this.refs.distLiRef.id, this.refs.distAnchor.id, this.refs.distArrowRef.id)} id="distID" ref="distAnchor"  >Distance <span id="distArrow" ref="distArrowRef"></span></a></li>
                                <li id="nameLi" ref="nameLiRef"><a onClick={() => this.OnSort(this.refs.nameLiRef.id, this.refs.nameAnchor.id, this.refs.nameArrowRef.id)} id="nameID" ref="nameAnchor"  >Name <span id="nameArrow" ref="nameArrowRef"></span></a></li>
                                <li id="ratingLi" ref="ratingLiRef"> <a onClick={() => this.OnSort(this.refs.ratingLiRef.id, this.refs.ratingAnchor.id, this.refs.ratingArrowRef.id)} id="ratingID" ref="ratingAnchor"  >Rating <span id="ratingArrow" ref="ratingArrowRef" ></span></a></li>
                                <span className="properties"> {this.Flights.SearchFilter.length} properties found </span>
                            </ul>

                            {currentHotels.map((data, key) => {
                                return (


                                    <div className="col-sm-6 col-md-6" key={key}>
                                        <div className="thumbnail" >
                                            <div className="img-div">
                                                <img src={data.image.map(img => { return img.url; })} className="img-responsive" alt="Tajawal images" />
                                            </div>
                                            <div className="caption">
                                                <Rater total={5} rating={data.rating.map(rating => { return rating.value })} interactive={false} />
                                                <div className="row">
                                                    <div className="col-md-6 col-xs-6 hotelName-div">
                                                        <h4>{data.summary.hotelName}</h4>
                                                    </div>
                                                    <div className="col-md-6 col-xs-6 price">

                                                    </div>
                                                </div>
                                                <div className="address-div">
                                                    <p>{data.location.address}</p>
                                                </div>
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
                    totalItemsCount={this.Flights.SearchFilter.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}

// https://github.com/airbnb/rheostat

export default Flights;